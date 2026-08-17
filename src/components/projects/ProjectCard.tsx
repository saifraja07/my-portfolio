import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group flex h-full flex-col rounded-lg border border-hairline p-6 transition-colors hover:border-gold-soft/60',
        featured && 'sm:p-8',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Badge tone="gold">{project.category}</Badge>
        <span className="text-xs text-ink-faint">{project.year}</span>
      </div>

      <h3 className={cn('mt-4 text-ink', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">{project.description}</p>

      {featured && (
        <p className="mt-3 line-clamp-2 text-xs text-ink-faint">{project.problem}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-ink-muted transition-colors group-hover:text-gold-soft">
        View Project
        <ArrowRight size={14} strokeWidth={1.6} />
      </span>
    </Link>
  );
}
