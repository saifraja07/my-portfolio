import { NavLink, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { primaryNav } from '@/data/navigation';
import { siteConfig } from '@/data/profile';
import { SocialLinks } from './SocialLinks';
import { cn } from '@/lib/utils';
import { isAppleDevice } from '@/lib/platform';

interface SidebarProps {
  onOpenCommandPalette: () => void;
}

export function Sidebar({ onOpenCommandPalette }: SidebarProps) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col justify-between border-r border-hairline bg-void/80 px-6 py-8 backdrop-blur-sm lg:flex"
      aria-label="Primary"
    >
      <div>
        <NavLink
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline font-mono text-sm text-gold-soft transition-colors hover:border-gold-soft"
          aria-label={`${siteConfig.name} — Home`}
        >
          {siteConfig.shortName}
        </NavLink>

        <nav className="mt-10">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.route}>
                <NavLink
                  to={item.route}
                  end={item.route === '/'}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-md px-3 py-2 text-sm tracking-wide text-ink-muted transition-colors hover:text-ink',
                      isActive && 'bg-void-elevated text-ink',
                    )
                  }
                >
                  {item.label.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="mt-6 flex w-full items-center justify-between rounded-md border border-hairline px-3 py-2 text-xs text-ink-faint transition-colors hover:border-gold-soft/60 hover:text-ink-muted"
        >
          <span className="flex items-center gap-2">
            <Search size={13} strokeWidth={1.6} />
            Search
          </span>
          <span className="font-mono">{isAppleDevice() ? '⌘K' : 'Ctrl K'}</span>
        </button>
      </div>

      <div>
        <SocialLinks />
        <Link
          to="/recruiter"
          className="mt-4 block text-xs text-ink-faint transition-colors hover:text-ink-muted"
        >
          Recruiter View →
        </Link>
      </div>
    </aside>
  );
}
