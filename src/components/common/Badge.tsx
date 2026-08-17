import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'gold' | 'purple' | 'cyan' | 'blue' | 'orange';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'border-hairline text-ink-muted',
  gold: 'border-gold/40 text-gold-soft',
  purple: 'border-purple/40 text-purple',
  cyan: 'border-cyan/40 text-cyan',
  blue: 'border-blue/40 text-blue',
  orange: 'border-orange/40 text-orange',
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
