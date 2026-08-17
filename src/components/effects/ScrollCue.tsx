import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export function ScrollCue() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2 pb-4 text-ink-faint" aria-hidden="true">
      <span className="text-eyebrow">Scroll to explore</span>
      <span className="relative h-8 w-5 overflow-hidden rounded-full border border-hairline">
        <span
          className={cn(
            'absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-ink-faint',
            !reducedMotion && 'animate-bounce',
          )}
        />
      </span>
    </div>
  );
}
