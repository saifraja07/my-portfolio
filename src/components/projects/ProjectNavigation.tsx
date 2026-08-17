import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';

export function ProjectNavigation({ index }: { index: number }) {
  if (projects.length <= 1) return null;

  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <nav
      aria-label="Project navigation"
      className="mt-20 flex items-center justify-between border-t border-hairline pt-8"
    >
      {previous ? (
        <Link
          to={`/projects/${previous.slug}`}
          className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} strokeWidth={1.6} />
          <span>
            <span className="block text-xs text-ink-faint">Previous</span>
            {previous.shortTitle ?? previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="flex items-center gap-2 text-right text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <span>
            <span className="block text-xs text-ink-faint">Next</span>
            {next.shortTitle ?? next.title}
          </span>
          <ArrowRight size={14} strokeWidth={1.6} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
