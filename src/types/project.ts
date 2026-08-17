export type ProjectCategory =
  | 'Full-Stack'
  | 'Backend'
  | 'Cloud & DevOps'
  | 'System Design';

export type ProjectStatus = 'Live' | 'In Progress' | 'Archived';

export interface ArchitectureNode {
  id: string;
  label: string;
  description?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagramData {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'github' | 'docs' | 'case-study' | 'download';
}

export interface Project {
  slug: string;
  title: string;
  /** Short form used in tight spaces like prev/next navigation. Falls back to title. */
  shortTitle?: string;
  description: string;
  /** Longer framing for the Overview section. Optional — Overview falls back to description. */
  longDescription?: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  /** Lower sorts first in prioritized listings (e.g. Recruiter View). Falls back to array order. */
  priority?: number;
  technologies: string[];
  thumbnail: string;
  screenshots: ProjectScreenshot[];
  liveUrl?: string;
  githubUrl?: string;
  /** Additional links beyond live/GitHub (docs, case study, download). */
  links?: ProjectLink[];
  problem: string;
  approach: string;
  architecture?: ArchitectureDiagramData;
  implementation: string[];
  challenges: string[];
  results: string[];
  lessons: string[];
  highlights: string[];
  /** Other project slugs to surface under "Related Projects". Resolved, never duplicated. */
  relatedProjectSlugs?: string[];
}
