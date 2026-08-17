export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  description: string;
  context: string;
  relatedProjectSlugs: string[];
}
