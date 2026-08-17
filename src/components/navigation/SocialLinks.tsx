import { Code2, Briefcase, Mail } from 'lucide-react';
import { socialLinks } from '@/data/profile';
import { cn } from '@/lib/utils';

// lucide-react no longer ships brand marks; generic icons stand in for
// GitHub/LinkedIn until real brand assets (or an svg set) are wired in.
const iconMap = {
  github: Code2,
  linkedin: Briefcase,
  mail: Mail,
  twitter: Mail,
} as const;

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ className, iconSize = 18 }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <li key={link.label}>
            <a
              href={link.url}
              target={link.icon === 'mail' ? undefined : '_blank'}
              rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              className="text-ink-faint transition-colors hover:text-gold-soft"
            >
              <Icon size={iconSize} strokeWidth={1.6} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
