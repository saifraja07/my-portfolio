import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { buttonClass } from '@/lib/buttonStyles';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Badge } from '@/components/common/Badge';
import { writingEntries } from '@/data/writing';

export function WritingDetails() {
  const { slug } = useParams<{ slug: string }>();
  const entry = writingEntries.find((item) => item.slug === slug);

  if (!entry) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-eyebrow text-gold-soft">Not Found</p>
        <h1 className="mt-4 text-3xl text-ink">
          {slug ? `No entry matches "${slug}".` : "That entry doesn't exist."}
        </h1>
        <Link
          to="/writing"
          className={buttonClass('primary', 'mt-8')}
        >
          <ArrowLeft size={14} strokeWidth={1.6} />
          All Writing
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Seo title={entry.title} description={entry.summary} path={`/writing/${entry.slug}`} />
      <Container className="max-w-2xl pb-24 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', route: '/' },
            { label: 'Writing', route: '/writing' },
            { label: entry.title },
          ]}
        />

        <div className="mt-8 flex items-center gap-3">
          <Badge tone="purple">{entry.kind}</Badge>
          <span className="text-xs text-ink-faint">{entry.date}</span>
          <span className="text-xs text-ink-faint">· {entry.readingMinutes} min</span>
        </div>

        <h1 className="mt-4 text-3xl text-ink sm:text-4xl">{entry.title}</h1>
        <p className="mt-4 text-ink-muted">{entry.summary}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8">
          {entry.body.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </>
  );
}
