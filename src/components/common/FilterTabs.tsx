import { cn } from '@/lib/utils';

interface FilterTabsProps {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
}

export function FilterTabs({ options, active, onChange, label }: FilterTabsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors duration-200',
              isActive
                ? 'border-gold-soft text-gold-soft'
                : 'border-hairline text-ink-muted hover:text-ink',
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
