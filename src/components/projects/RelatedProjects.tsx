import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export function RelatedProjects({ slugs }: { slugs?: string[] }) {
  if (!slugs || slugs.length === 0) return null;

  const related = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-eyebrow text-ink-faint">Related Projects</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {related.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
