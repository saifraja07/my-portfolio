import { siteConfig, socialLinks } from '@/data/profile';
import { ResumeButtons } from '@/components/common/ResumeButtons';
import { buttonClass } from '@/lib/buttonStyles';
import { cn } from '@/lib/utils';

export function RecruiterContact() {
  const github = socialLinks.find((link) => link.icon === 'github');
  const linkedin = socialLinks.find((link) => link.icon === 'linkedin');

  return (
    <section id="contact" className="scroll-mt-20 py-10">
      <h2 className="text-2xl text-ink sm:text-3xl">Have a project or opportunity?</h2>
      <p className="mt-2 text-ink-muted">Let's talk.</p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <a href={`mailto:${siteConfig.email}`} className={buttonClass('primary')}>
          Email Me
        </a>
        {linkedin && (
          <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={cn(buttonClass('secondary'))}>
            LinkedIn
          </a>
        )}
      </div>

      <div className="mt-6 print:hidden">
        <ResumeButtons primaryVariant="secondary" />
      </div>

      {/* Plain-text fallback so contact details survive printing even with buttons hidden. */}
      <dl className="mt-6 flex flex-col gap-1 text-sm text-ink-faint">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0">Email</dt>
          <dd>{siteConfig.email}</dd>
        </div>
        {github && (
          <div className="flex gap-2">
            <dt className="w-20 shrink-0">GitHub</dt>
            <dd>{github.url.replace('https://', '')}</dd>
          </div>
        )}
        {linkedin && (
          <div className="flex gap-2">
            <dt className="w-20 shrink-0">LinkedIn</dt>
            <dd>{linkedin.url.replace('https://', '')}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
