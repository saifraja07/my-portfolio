import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/data/profile';

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function RecruiterNavigation() {
  return (
    <header className="print:hidden sticky top-0 z-30 border-b border-hairline bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-x-auto px-6 py-3">
        <span className="shrink-0 font-mono text-sm text-gold-soft">{siteConfig.shortName}</span>

        <nav aria-label="Recruiter view sections" className="flex shrink-0 items-center gap-4">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="whitespace-nowrap text-xs text-ink-muted transition-colors hover:text-ink"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <Link
          to="/"
          className="flex shrink-0 items-center gap-1.5 text-xs text-ink-faint transition-colors hover:text-gold-soft"
        >
          <ArrowLeft size={12} strokeWidth={1.6} />
          Developer Universe
        </Link>
      </div>
    </header>
  );
}
