import { Code2, Globe, FileText, BookOpen, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Project, ProjectLink } from '@/types/project';
import { ExternalLink } from '@/components/common/ExternalLink';

const ICON_MAP: Record<ProjectLink['kind'], LucideIcon> = {
  live: Globe,
  github: Code2,
  docs: FileText,
  'case-study': BookOpen,
  download: Download,
};

export function ProjectLinks({ project }: { project: Project }) {
  const links: ProjectLink[] = [
    ...(project.liveUrl ? [{ label: 'Live Demo', url: project.liveUrl, kind: 'live' as const }] : []),
    ...(project.githubUrl ? [{ label: 'GitHub', url: project.githubUrl, kind: 'github' as const }] : []),
    ...(project.links ?? []),
  ];

  if (links.length === 0) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Links</h2>
      <div className="mt-4 flex flex-wrap gap-4">
        {links.map((link) => {
          const Icon = ICON_MAP[link.kind];
          return (
            <ExternalLink key={link.url} href={link.url} showIcon={false} className="inline-flex items-center gap-1.5">
              <Icon size={14} strokeWidth={1.6} />
              {link.label}
            </ExternalLink>
          );
        })}
      </div>
    </section>
  );
}
