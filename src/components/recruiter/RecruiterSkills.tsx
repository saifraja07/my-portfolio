import { Link } from 'react-router-dom';
import { skills } from '@/data/skills';

const MAX_SKILLS = 8;

export function RecruiterSkills() {
  const selected = [...skills]
    .sort((a, b) => b.relatedProjectSlugs.length - a.relatedProjectSlugs.length)
    .slice(0, MAX_SKILLS);

  return (
    <section id="skills" className="scroll-mt-20 border-b border-hairline py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-eyebrow text-gold-soft">Core Skills</h2>
        <Link to="/skills" className="text-xs text-ink-faint transition-colors hover:text-ink">
          View all skills →
        </Link>
      </div>

      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {selected.map((skill) => (
          <li key={skill.id} className="flex items-baseline justify-between gap-3 border-b border-hairline py-2">
            <span className="text-sm text-ink">{skill.name}</span>
            <span className="text-xs text-ink-faint">{skill.category}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
