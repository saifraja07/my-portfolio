import type { NavigateFunction } from 'react-router-dom';
import { primaryNav } from '@/data/navigation';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { siteConfig } from '@/data/profile';

export type CommandGroup = 'Navigation' | 'Projects' | 'Skills' | 'Actions';

export interface CommandItem {
  id: string;
  group: CommandGroup;
  label: string;
  description?: string;
  keywords?: string[];
  /** True for side-effect actions (e.g. clipboard copy) that show inline feedback instead of navigating away. */
  keepOpen?: boolean;
  perform: (context: { navigate: NavigateFunction }) => void | Promise<void>;
}

const navigationItems: CommandItem[] = primaryNav.map((item) => ({
  id: `nav-${item.route}`,
  group: 'Navigation',
  label: item.label,
  perform: ({ navigate }) => navigate(item.route),
}));

const projectItems: CommandItem[] = projects.map((project) => ({
  id: `project-${project.slug}`,
  group: 'Projects',
  label: project.title,
  description: project.description,
  keywords: [project.category, ...project.technologies],
  perform: ({ navigate }) => navigate(`/projects/${project.slug}`),
}));

const skillItems: CommandItem[] = skills.map((skill) => ({
  id: `skill-${skill.id}`,
  group: 'Skills',
  label: skill.name,
  description: skill.description,
  keywords: [skill.category],
  perform: ({ navigate }) => navigate(`/skills#${skill.id}`),
}));

export async function copyEmailToClipboard(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(siteConfig.email);
    return true;
  } catch {
    return false;
  }
}

async function downloadResume(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch(siteConfig.resumePath, { method: 'HEAD' });
    if (!response.ok) {
      return { ok: false, message: "Resume isn't available yet." };
    }
    const link = document.createElement('a');
    link.href = siteConfig.resumePath;
    link.download = '';
    link.click();
    return { ok: true, message: 'Downloading résumé…' };
  } catch {
    return { ok: false, message: "Resume isn't available yet." };
  }
}

interface ActionCallbacks {
  onCopyEmail: () => void;
  onDownloadResume: (result: { ok: boolean; message: string }) => void;
}

function buildActionItems({ onCopyEmail, onDownloadResume }: ActionCallbacks): CommandItem[] {
  const actions: CommandItem[] = [
    {
      id: 'action-recruiter-view',
      group: 'Actions',
      label: 'Recruiter View',
      description: 'A faster, denser overview for evaluating quickly',
      perform: ({ navigate }) => navigate('/recruiter'),
    },
    {
      id: 'action-view-resume',
      group: 'Actions',
      label: 'View Resume',
      perform: ({ navigate }) => navigate('/resume'),
    },
    {
      id: 'action-download-resume',
      group: 'Actions',
      label: 'Download Resume',
      keepOpen: true,
      perform: () => downloadResume().then(onDownloadResume),
    },
  ];

  if (siteConfig.email) {
    actions.push({
      id: 'action-copy-email',
      group: 'Actions',
      label: 'Copy Email',
      description: siteConfig.email,
      keepOpen: true,
      perform: () => onCopyEmail(),
    });
  }

  return actions;
}

export function buildCommandItems(callbacks: ActionCallbacks): CommandItem[] {
  return [...navigationItems, ...projectItems, ...skillItems, ...buildActionItems(callbacks)];
}
