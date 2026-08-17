import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Badge } from '@/components/common/Badge';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="My development journey."
        path="/experience"
      />
      <PageHeader eyebrow="03 / Experience" title="My professional journey" />
      <Container className="max-w-2xl pb-24">
        <ol className="flex flex-col gap-10 border-l border-hairline pl-8">
          {experience.map((item) => (
            <ScrollReveal key={item.id}>
              <li className="relative">
              <span className="absolute -left-[calc(2rem+3px)] top-1.5 h-1.5 w-1.5 rounded-full bg-gold-soft" />
              <p className="text-eyebrow text-ink-faint">{item.year}</p>
              <h2 className="mt-1 text-xl text-ink">{item.title}</h2>
              <p className="mt-2 text-ink-muted">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              {item.achievements.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="text-sm text-ink-muted">
                      — {achievement}
                    </li>
                  ))}
                </ul>
              )}
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </>
  );
}
