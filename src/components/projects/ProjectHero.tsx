import { ExternalLink } from '@/components/common/ExternalLink';
import { Badge } from '@/components/common/Badge';
import type { Project } from '@/types/project';

interface ProjectHeroProps {
  project: Project;
  index: number;
}

export function ProjectHero({ project, index }: ProjectHeroProps) {
  return (
    <div>
      <span className="font-mono text-sm text-ink-faint">{String(index + 1).padStart(2, '0')}</span>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Badge tone="gold">{project.category}</Badge>
        <Badge>{project.status}</Badge>
        <span className="text-xs text-ink-faint">{project.year}</span>
      </div>

      <h1 className="mt-4 text-4xl uppercase text-ink sm:text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">{project.description}</p>

      <p className="mt-6 font-mono text-xs text-ink-faint">
        {project.technologies.join(' · ')}
      </p>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && <ExternalLink href={project.liveUrl}>Live Demo</ExternalLink>}
          {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
        </div>
      )}
    </div>
  );
}
