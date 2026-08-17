import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { FilterTabs } from '@/components/common/FilterTabs';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { SKILL_CATEGORIES } from '@/lib/constants';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const location = useLocation();

  const filtered = useMemo(
    () => (activeCategory === 'All' ? skills : skills.filter((skill) => skill.category === activeCategory)),
    [activeCategory],
  );

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // Wait a frame so the list has rendered before scrolling to the anchor.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'center' });
    });
  }, [location.hash]);

  return (
    <>
      <Seo
        title="Skills"
        description="Technologies I work with, organized by where they sit in the stack."
        path="/skills"
      />
      <PageHeader eyebrow="04 / Skills" title="Technologies I work with" />
      <Container className="pb-24">
        <FilterTabs
          options={SKILL_CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
          label="Filter skills by category"
        />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => {
            const relatedProjects = skill.relatedProjectSlugs
              .map((slug) => projects.find((project) => project.slug === slug))
              .filter((project): project is NonNullable<typeof project> => Boolean(project));

            return (
              <li key={skill.id} id={skill.id} className="scroll-mt-24 rounded-lg border border-hairline p-4">
                <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">{skill.category}</p>
                <h3 className="mt-1 text-lg text-ink">{skill.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{skill.description}</p>
                <p className="mt-3 text-xs text-ink-faint">{skill.context}</p>

                {relatedProjects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-3">
                    <span className="text-xs text-ink-faint">Related:</span>
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        to={`/projects/${project.slug}`}
                        className="text-xs text-ink-muted underline-offset-2 transition-colors hover:text-gold-soft hover:underline"
                      >
                        {project.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-faint">No skills in this category yet.</p>
        )}
      </Container>
    </>
  );
}
