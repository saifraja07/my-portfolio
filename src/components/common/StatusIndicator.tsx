import { cn } from '@/lib/utils';

type StatusTone = 'active' | 'idle' | 'neutral';

interface StatusIndicatorProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

const dotClasses: Record<StatusTone, string> = {
  active: 'bg-cyan',
  idle: 'bg-orange',
  neutral: 'bg-ink-faint',
};

export function StatusIndicator({ label, tone = 'neutral', className }: StatusIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5', className)}>
      <span className="relative flex h-2 w-2">
        {tone === 'active' && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', dotClasses[tone])} />
        )}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', dotClasses[tone])} />
      </span>
      <span className="text-eyebrow text-ink-muted">{label}</span>
    </div>
  );
}
