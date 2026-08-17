import { Download, ExternalLink as ExternalLinkIcon, FileX2 } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { siteConfig } from '@/data/profile';
import { useResumeAvailability } from '@/hooks/useResumeAvailability';
import { buttonClass } from '@/lib/buttonStyles';
import { cn } from '@/lib/utils';

export function Resume() {
  const status = useResumeAvailability(siteConfig.resumePath);

  return (
    <>
      <Seo title="Resume" description={`${siteConfig.name}'s resume.`} path="/resume" />
      <PageHeader eyebrow="Resume" title="Resume">
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={siteConfig.resumePath}
            download
            aria-disabled={status !== 'available'}
            onClick={(event) => status !== 'available' && event.preventDefault()}
            className={cn(buttonClass('primary'), 'aria-disabled:pointer-events-none aria-disabled:opacity-50')}
          >
            <Download size={16} strokeWidth={1.6} />
            Download PDF
          </a>
          <a
            href={siteConfig.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={status !== 'available'}
            onClick={(event) => status !== 'available' && event.preventDefault()}
            className={cn(buttonClass('secondary'), 'aria-disabled:pointer-events-none aria-disabled:opacity-50')}
          >
            <ExternalLinkIcon size={16} strokeWidth={1.6} />
            Open PDF
          </a>
        </div>
      </PageHeader>
      <Container className="pb-24">
        {status === 'available' ? (
          <iframe
            src={siteConfig.resumePath}
            title={`${siteConfig.name}'s resume`}
            className="aspect-[3/4] w-full max-w-md rounded-lg border border-hairline"
          />
        ) : (
          <div className="flex aspect-[3/4] max-w-md flex-col items-center justify-center gap-3 rounded-lg border border-hairline text-center">
            <FileX2 size={22} className="text-ink-faint" strokeWidth={1.6} />
            <p className="max-w-[26ch] text-sm text-ink-faint">
              {status === 'checking'
                ? 'Checking for a resume file…'
                : `No resume file found yet at ${siteConfig.resumePath}.`}
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
