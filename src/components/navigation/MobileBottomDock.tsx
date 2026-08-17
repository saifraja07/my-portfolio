import { useEffect, useId, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { dockPrimaryNav, dockOverflowNav } from '@/data/navigation';
import { fadeUp } from '@/lib/animations';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { MoreMenu } from './MoreMenu';

const itemClass = (isActive: boolean) =>
  cn(
    'flex h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-full px-3 text-ink-faint transition-colors',
    isActive ? 'text-gold-soft' : 'hover:text-ink-muted',
  );

export function MobileBottomDock() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const location = useLocation();
  const menuId = useId();

  const isOverflowActive = dockOverflowNav.some((item) =>
    item.route === '/' ? location.pathname === '/' : location.pathname.startsWith(item.route),
  );

  // Close the "More" menu on route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 lg:hidden">
      <motion.div
        ref={containerRef}
        className="relative"
        variants={fadeUp}
        initial={reducedMotion ? false : 'initial'}
        animate="animate"
      >
        <MoreMenu isOpen={isOpen} items={dockOverflowNav} onSelect={() => setIsOpen(false)} menuId={menuId} />

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-hairline bg-void-elevated/90 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          {dockPrimaryNav.map((item) => (
            <NavLink
              key={item.route}
              to={item.route}
              end={item.route === '/'}
              className={({ isActive }) => itemClass(isActive)}
            >
              {item.icon && <item.icon size={19} strokeWidth={1.6} />}
              <span className="text-[10px] leading-none tracking-wide">{item.label}</span>
            </NavLink>
          ))}

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="More navigation"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={menuId}
            className={itemClass(isOpen || isOverflowActive)}
          >
            <MoreHorizontal size={19} strokeWidth={1.6} />
            <span className="text-[10px] leading-none tracking-wide">More</span>
          </button>
        </nav>
      </motion.div>
    </div>
  );
}
