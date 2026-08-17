import { skills } from '@/data/skills';
import { SKILL_CATEGORIES } from '@/lib/constants';

export function RecruiterTechnicalFocus() {
  const categories = SKILL_CATEGORIES.filter((category) => category !== 'All');

  return (
    <section className="border-b border-hairline py-10">
      <h2 className="text-eyebrow text-gold-soft">Technical Focus</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">{category}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {items.map((skill) => (
                  <li key={skill.id} className="text-sm text-ink-muted">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
