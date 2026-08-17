import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from '@/components/common/Badge';
import { ExternalLink } from '@/components/common/ExternalLink';

const MAX_PROJECTS = 4;

export function RecruiterProjects() {
  const selected = [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity))
    .slice(0, MAX_PROJECTS);

  if (selected.length === 0) return null;

  return (
    <section id="projects" className="scroll-mt-20 border-b border-hairline py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-eyebrow text-gold-soft">Selected Projects</h2>
        <Link to="/projects" className="text-xs text-ink-faint transition-colors hover:text-ink">
          View all projects →
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {selected.map((project) => (
          <div key={project.slug} className="flex flex-col rounded-lg border border-hairline p-5">
            <div className="flex items-center justify-between gap-3">
              <Badge tone="gold">{project.category}</Badge>
              <span className="text-xs text-ink-faint">{project.year}</span>
            </div>
            <h3 className="mt-3 text-lg text-ink">{project.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 pt-2 text-sm">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-gold-soft"
              >
                View Case Study
                <ArrowRight size={13} strokeWidth={1.6} />
              </Link>
              {project.liveUrl && <ExternalLink href={project.liveUrl}>Live</ExternalLink>}
              {project.githubUrl && <ExternalLink href={project.githubUrl}>GitHub</ExternalLink>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
