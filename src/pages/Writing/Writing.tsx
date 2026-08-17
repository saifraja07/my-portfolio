import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Badge } from '@/components/common/Badge';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { writingEntries } from '@/data/writing';

export function Writing() {
  return (
    <>
      <Seo
        title="Writing"
        description="Technical notes, experiments, and things learned."
        path="/writing"
      />
      <PageHeader eyebrow="05 / Writing" title="Thoughts and learnings" />
      <Container className="max-w-2xl pb-24">
        {writingEntries.length === 0 ? (
          <p className="text-ink-faint">Nothing published yet — check back soon.</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {writingEntries.map((entry) => (
              <ScrollReveal key={entry.slug}>
                <li className="border-b border-hairline pb-8 last:border-none">
                <div className="flex items-center gap-3">
                  <Badge tone="purple">{entry.kind}</Badge>
                  <span className="text-xs text-ink-faint">{entry.date}</span>
                  <span className="text-xs text-ink-faint">· {entry.readingMinutes} min</span>
                </div>
                <Link to={`/writing/${entry.slug}`} className="group">
                  <h2 className="mt-3 text-xl text-ink transition-colors group-hover:text-gold-soft">
                    {entry.title}
                  </h2>
                </Link>
                <p className="mt-2 text-ink-muted">{entry.summary}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
