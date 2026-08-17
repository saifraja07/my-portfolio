import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import { siteConfig } from '@/data/profile';

interface MobileNavProps {
  onOpenCommandPalette: () => void;
}

export function MobileNav({ onOpenCommandPalette }: MobileNavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-hairline bg-void/90 px-4 py-3 backdrop-blur-sm lg:hidden">
      <NavLink to="/" className="font-mono text-sm text-gold-soft" aria-label={`${siteConfig.name} — Home`}>
        {siteConfig.shortName}
      </NavLink>

      <button
        type="button"
        onClick={onOpenCommandPalette}
        aria-label="Search the universe"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-transform active:scale-95"
      >
        <Search size={16} strokeWidth={1.6} />
      </button>
    </header>
  );
}
