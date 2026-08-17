export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'mail' | 'twitter';
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  availability: boolean;
  email: string;
  github: string;
  linkedin: string;
  resumePath: string;
  siteUrl: string;
  /** Social preview image path. Left undefined until a real asset exists — Seo skips the meta tag gracefully. */
  ogImage?: string;
}

export interface ProfileSection {
  heading: string;
  body: string[];
}

export interface Profile {
  greeting: string;
  fullName: string;
  role: string;
  summary: string;
  focusAreas: string[];
  introduction: ProfileSection;
  whatIDo: ProfileSection;
  whatIEnjoyBuilding: ProfileSection;
  philosophy: ProfileSection;
  currentFocus: ProfileSection;
}
