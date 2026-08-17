import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-void hover:bg-gold-soft',
  secondary: 'border border-hairline text-ink hover:border-gold-soft hover:text-gold-soft',
  ghost: 'text-ink-muted hover:text-ink',
};

export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium',
    'transition-[background-color,border-color,color,transform] duration-200',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    className,
  );
}
