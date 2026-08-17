import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '@/types/navigation';
import { fadeUp } from '@/lib/animations';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SocialLinks } from './SocialLinks';
import { cn } from '@/lib/utils';

interface MoreMenuProps {
  isOpen: boolean;
  items: NavItem[];
  onSelect: () => void;
  menuId: string;
}

export function MoreMenu({ isOpen, items, onSelect, menuId }: MoreMenuProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={menuId}
          role="menu"
          aria-label="More navigation"
          variants={fadeUp}
          initial={reducedMotion ? false : 'initial'}
          animate="animate"
          exit="initial"
          transition={reducedMotion ? { duration: 0 } : undefined}
          className="absolute bottom-full left-1/2 mb-3 w-52 -translate-x-1/2 overflow-hidden rounded-lg border border-hairline bg-void-elevated shadow-2xl"
        >
          <ul className="py-1.5">
            {items.map((item) => (
              <li key={item.route} role="none">
                <NavLink
                  role="menuitem"
                  to={item.route}
                  onClick={onSelect}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink',
                      isActive && 'text-gold-soft',
                    )
                  }
                >
                  {item.icon && <item.icon size={16} strokeWidth={1.6} />}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline px-4 py-3">
            <SocialLinks iconSize={16} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
