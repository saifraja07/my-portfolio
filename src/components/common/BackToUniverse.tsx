import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackToUniverse() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-gold-soft"
    >
      <ArrowLeft size={14} strokeWidth={1.6} />
      Back to Universe
    </Link>
  );
}
