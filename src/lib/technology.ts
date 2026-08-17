import { skills } from '@/data/skills';
import type { Skill, SkillCategory } from '@/types/skill';

export interface ResolvedTechnology {
  name: string;
  skill?: Skill;
}

const OTHER_GROUP = 'Other';

function findSkill(techName: string): Skill | undefined {
  return skills.find((skill) => skill.name.toLowerCase() === techName.toLowerCase());
}

/** Groups a project's technology names by skill category, matched against skills.ts. */
export function groupTechnologiesByCategory(
  technologies: string[],
): Array<{ category: SkillCategory | typeof OTHER_GROUP; items: ResolvedTechnology[] }> {
  const groups = new Map<SkillCategory | typeof OTHER_GROUP, ResolvedTechnology[]>();

  for (const techName of technologies) {
    const skill = findSkill(techName);
    const category = skill?.category ?? OTHER_GROUP;
    const list = groups.get(category) ?? [];
    list.push({ name: techName, skill });
    groups.set(category, list);
  }

  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }));
}
