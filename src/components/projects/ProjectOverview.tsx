import type { Project } from '@/types/project';

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Overview</h2>
      <p className="mt-3 text-ink-muted">{project.description}</p>
      {project.longDescription && <p className="mt-3 text-ink-muted">{project.longDescription}</p>}
    </section>
  );
}
