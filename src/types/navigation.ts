import type { LucideIcon } from 'lucide-react';

export type UniverseAccent = 'gold' | 'purple' | 'cyan' | 'blue' | 'orange';

export interface UniverseNode {
  id: string;
  number: string;
  label: string;
  description: string;
  route: string;
  accent: UniverseAccent;
  /** Orbit radius as a percentage of the container, and starting angle in degrees. */
  orbitRadius: number;
  orbitAngle: number;
}

export interface NavItem {
  label: string;
  route: string;
  /** Optional icon for compact presentations (e.g. the mobile bottom dock). */
  icon?: LucideIcon;
}
