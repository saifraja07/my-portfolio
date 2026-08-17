import { profile, siteConfig, socialLinks } from '@/data/profile';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { ResumeButtons } from '@/components/common/ResumeButtons';
import { buttonClass } from '@/lib/buttonStyles';
import { cn } from '@/lib/utils';

export function RecruiterHero() {
  const github = socialLinks.find((link) => link.icon === 'github');
  const linkedin = socialLinks.find((link) => link.icon === 'linkedin');

  return (
    <div className="border-b border-hairline pb-10">
      <h1 className="text-4xl text-ink sm:text-5xl">{profile.fullName}</h1>
      <p className="mt-2 font-mono text-sm uppercase tracking-widest text-ink-muted">{profile.role}</p>
      <p className="mt-4 max-w-xl text-ink-muted">{siteConfig.tagline}</p>
      <p className="mt-1 text-sm text-ink-faint">
        {profile.focusAreas.join(' · ')} — {siteConfig.location}
      </p>

      {siteConfig.availability && (
        <div className="mt-5 print:hidden">
          <StatusIndicator label="Available for work" tone="active" />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <ResumeButtons />
        <a href={`mailto:${siteConfig.email}`} className={buttonClass('secondary')}>
          Contact
        </a>
        {github && (
          <a href={github.url} target="_blank" rel="noopener noreferrer" className={cn(buttonClass('ghost'), 'border border-hairline')}>
            GitHub
          </a>
        )}
        {linkedin && (
          <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={cn(buttonClass('ghost'), 'border border-hairline')}>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
