import Section from "./Section";
import { skillGroups } from "../data/skills";

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I Work With"
      className="border-t border-border"
    >
      <div className="grid gap-8 sm:grid-cols-3">
        {skillGroups.map(({ label, icon: Icon, items }) => (
          <div key={label}>
            <div className="mb-4 flex items-center gap-2 text-ink">
              <Icon size={18} strokeWidth={1.75} className="text-accent" />
              <h3 className="text-sm font-medium">{label}</h3>
            </div>
            <ul className="flex flex-col gap-2.5 border-l border-border pl-4">
              {items.map((item) => (
                <li key={item} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
