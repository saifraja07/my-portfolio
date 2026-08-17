import { Home, User, FolderKanban, Briefcase, Layers, PenLine, Mail, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { NavItem, UniverseNode } from '@/types/navigation';

export const universeNodes: UniverseNode[] = [
  {
    id: 'about',
    number: '01',
    label: 'About',
    description: 'Who I am',
    route: '/about',
    accent: 'gold',
    orbitRadius: 32,
    orbitAngle: -90,
  },
  {
    id: 'projects',
    number: '02',
    label: 'Projects',
    description: "Things I've built",
    route: '/projects',
    accent: 'purple',
    orbitRadius: 45,
    orbitAngle: -30,
  },
  {
    id: 'experience',
    number: '03',
    label: 'Experience',
    description: 'My professional journey',
    route: '/experience',
    accent: 'cyan',
    orbitRadius: 32,
    orbitAngle: 30,
  },
  {
    id: 'skills',
    number: '04',
    label: 'Skills',
    description: 'Technologies I work with',
    route: '/skills',
    accent: 'blue',
    orbitRadius: 45,
    orbitAngle: 90,
  },
  {
    id: 'writing',
    number: '05',
    label: 'Writing',
    description: 'Thoughts and learnings',
    route: '/writing',
    accent: 'orange',
    orbitRadius: 32,
    orbitAngle: 150,
  },
  {
    id: 'contact',
    number: '06',
    label: 'Contact',
    description: "Let's connect",
    route: '/contact',
    accent: 'gold',
    orbitRadius: 45,
    orbitAngle: 210,
  },
];

/** Icons for compact nav presentations (e.g. the mobile bottom dock), keyed by node id / 'home'. */
const navIcons: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  projects: FolderKanban,
  experience: Briefcase,
  skills: Layers,
  writing: PenLine,
  contact: Mail,
};

export const primaryNav: NavItem[] = [
  { label: 'Home', route: '/', icon: navIcons.home },
  ...universeNodes.map((node) => ({ label: node.label, route: node.route, icon: navIcons[node.id] })),
];

export const commandPaletteItems: NavItem[] = [
  ...primaryNav,
  { label: 'Resume', route: '/resume', icon: FileText },
];

/**
 * Grouping of `commandPaletteItems` for compact presentations (the mobile bottom
 * dock): a small primary set shown directly, plus the remainder — including
 * Resume — tucked behind "More". Derived from the same source of truth as the
 * sidebar and command palette; never a second navigation dataset.
 */
export const dockPrimaryRoutes = ['/', '/projects', '/experience'];
export const dockPrimaryNav: NavItem[] = commandPaletteItems.filter((item) =>
  dockPrimaryRoutes.includes(item.route),
);
export const dockOverflowNav: NavItem[] = commandPaletteItems.filter(
  (item) => !dockPrimaryRoutes.includes(item.route),
);
