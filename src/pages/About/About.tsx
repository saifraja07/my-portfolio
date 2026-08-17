import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Badge } from '@/components/common/Badge';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { profile } from '@/data/profile';

export function About() {
  return (
    <>
      <Seo title="About" description={profile.summary} path="/about" />
      <PageHeader eyebrow="01 / About" title="The person behind the code.">
        <p className="mt-4 max-w-2xl text-ink-muted">{profile.introduction.body[0]}</p>
      </PageHeader>

      <Container className="max-w-2xl pb-24">
        <div className="flex flex-col gap-14">
          {profile.introduction.body.length > 1 && (
            <ScrollReveal><section>
              <div className="flex flex-col gap-3">
                {profile.introduction.body.slice(1).map((paragraph) => (
                  <p key={paragraph} className="text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section></ScrollReveal>
          )}

          <ScrollReveal><section>
            <h2 className="text-eyebrow text-gold-soft">{profile.whatIDo.heading}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.focusAreas.map((area) => (
                <Badge key={area} tone="gold">
                  {area}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {profile.whatIDo.body.map((paragraph) => (
                <p key={paragraph} className="text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-eyebrow text-gold-soft">{profile.whatIEnjoyBuilding.heading}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {profile.whatIEnjoyBuilding.body.map((paragraph) => (
                <p key={paragraph} className="text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section>
            <h2 className="text-eyebrow text-gold-soft">{profile.currentFocus.heading}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {profile.currentFocus.body.map((paragraph) => (
                <p key={paragraph} className="text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section></ScrollReveal>

          <ScrollReveal><section className="rounded-lg border border-hairline p-6">
            <h2 className="text-eyebrow text-gold-soft">{profile.philosophy.heading}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {profile.philosophy.body.map((paragraph) => (
                <p key={paragraph} className="text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </section></ScrollReveal>
        </div>
      </Container>
    </>
  );
}
