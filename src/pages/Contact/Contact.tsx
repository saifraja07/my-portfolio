import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { ExternalLink } from '@/components/common/ExternalLink';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/data/profile';

export function Contact() {
  return (
    <>
      <Seo title="Contact" description="Get in touch." path="/contact" />
      <PageHeader
        eyebrow="06 / Contact"
        title="Let's build something."
        description="Have an idea, project, or opportunity? Let's talk."
      />
      <Container className="max-w-2xl pb-24">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr]">
          <dl className="flex shrink-0 flex-col gap-3 text-sm sm:min-w-[220px]">
            <div>
              <dt className="text-xs text-ink-faint">Email</dt>
              <dd className="mt-1">
                <ExternalLink href={`mailto:${siteConfig.email}`} showIcon={false}>
                  {siteConfig.email}
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">GitHub</dt>
              <dd className="mt-1">
                <ExternalLink href={siteConfig.github}>{siteConfig.github.replace('https://', '')}</ExternalLink>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-ink-faint">LinkedIn</dt>
              <dd className="mt-1">
                <ExternalLink href={siteConfig.linkedin}>{siteConfig.linkedin.replace('https://', '')}</ExternalLink>
              </dd>
            </div>
          </dl>

          <ContactForm />
        </div>
      </Container>
    </>
  );
}
