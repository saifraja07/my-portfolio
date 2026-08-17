import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ as: Tag = 'div', children, className, narrow = false }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-6 lg:px-12',
        narrow ? 'max-w-2xl' : 'max-w-5xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
