import { Download, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { siteConfig } from '@/data/profile';
import { useResumeAvailability } from '@/hooks/useResumeAvailability';
import { buttonClass, type ButtonVariant } from '@/lib/buttonStyles';
import { cn } from '@/lib/utils';

interface ResumeButtonsProps {
  primaryVariant?: ButtonVariant;
  className?: string;
}

export function ResumeButtons({ primaryVariant = 'primary', className }: ResumeButtonsProps) {
  const status = useResumeAvailability(siteConfig.resumePath);
  const isAvailable = status === 'available';

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a
        href={siteConfig.resumePath}
        download
        aria-disabled={!isAvailable}
        onClick={(event) => !isAvailable && event.preventDefault()}
        className={cn(buttonClass(primaryVariant), 'aria-disabled:pointer-events-none aria-disabled:opacity-50')}
      >
        <Download size={16} strokeWidth={1.6} />
        Download Resume
      </a>
      <a
        href={siteConfig.resumePath}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!isAvailable}
        onClick={(event) => !isAvailable && event.preventDefault()}
        className={cn(buttonClass('secondary'), 'aria-disabled:pointer-events-none aria-disabled:opacity-50')}
      >
        <ExternalLinkIcon size={16} strokeWidth={1.6} />
        View Resume
      </a>
    </div>
  );
}
