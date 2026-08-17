import { useMemo, useState } from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { FilterTabs } from '@/components/common/FilterTabs';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

const ALL = 'All';
const FEATURED = 'Featured';

export function Projects() {
  const options = useMemo(
    () => [ALL, FEATURED, ...new Set(projects.map((project) => project.category))],
    [],
  );
  const [activeFilter, setActiveFilter] = useState<string>(ALL);

  const filtered = useMemo(() => {
    if (activeFilter === ALL) return projects;
    if (activeFilter === FEATURED) return projects.filter((project) => project.featured);
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const featured = filtered.filter((project) => project.featured);
  const other = filtered.filter((project) => !project.featured);

  return (
    <>
      <Seo
        title="Projects"
        description="Things I've built — full-stack applications, backend systems, and infrastructure."
        path="/projects"
      />
      <PageHeader eyebrow="02 / Projects" title="Things I've built" />
      <Container className="pb-24">
        <FilterTabs
          options={options}
          active={activeFilter}
          onChange={setActiveFilter}
          label="Filter projects"
        />

        {featured.length > 0 && (
          <ScrollReveal>
            <section className="mt-10">
              <h2 className="text-eyebrow text-ink-faint">Featured Projects</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} featured />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {other.length > 0 && (
          <ScrollReveal>
            <section className="mt-14">
              <h2 className="text-eyebrow text-ink-faint">Other Projects</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {other.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-faint">No projects match this filter yet.</p>
        )}
      </Container>
    </>
  );
}
