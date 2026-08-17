export interface ExperienceLink {
  label: string;
  url: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  organization?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  links?: ExperienceLink[];
}
