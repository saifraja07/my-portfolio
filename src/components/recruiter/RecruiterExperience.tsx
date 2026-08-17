import { Link } from 'react-router-dom';
import { experience } from '@/data/experience';

export function RecruiterExperience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-hairline py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-eyebrow text-gold-soft">Experience</h2>
        <Link to="/experience" className="text-xs text-ink-faint transition-colors hover:text-ink">
          View full experience →
        </Link>
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {experience.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <span className="w-32 shrink-0 font-mono text-xs text-ink-faint">{item.year}</span>
            <div>
              <h3 className="text-sm text-ink">{item.title}</h3>
              <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
