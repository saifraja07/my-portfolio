import { Link } from 'react-router-dom';
import { groupTechnologiesByCategory } from '@/lib/technology';

export function ProjectTechnology({ technologies }: { technologies: string[] }) {
  if (technologies.length === 0) return null;

  const groups = groupTechnologiesByCategory(technologies);

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Technology</h2>
      <div className="mt-4 flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="w-24 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-faint">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) =>
                item.skill ? (
                  <Link
                    key={item.name}
                    to={`/skills#${item.skill.id}`}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-gold-soft hover:text-gold-soft"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    key={item.name}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-ink-muted"
                  >
                    {item.name}
                  </span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
