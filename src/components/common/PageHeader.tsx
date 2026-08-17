import type { ReactNode } from 'react';
import { Container } from './Container';
import { BackToUniverse } from './BackToUniverse';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <Container className="pb-10 pt-6">
      <div className="flex items-center justify-between gap-4">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : <BackToUniverse />}
      </div>
      <p className="text-eyebrow mt-6 text-gold-soft">{eyebrow}</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-ink-muted">{description}</p>}
      {children}
    </Container>
  );
}
