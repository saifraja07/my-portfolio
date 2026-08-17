import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function ExternalLink({ href, children, className, showIcon = true }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline', className)}
    >
      {children}
      {showIcon && <ArrowUpRight size={14} strokeWidth={1.6} />}
    </a>
  );
}
