import SectionHeading from '../ui/SectionHeading'
import { skillGroups } from '../../data/skills'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="shell py-16 lg:py-20">
      <div className="mx-auto max-w-250">
        <SectionHeading title="Skills" id="skills-title" />
        <dl className="mt-6 max-w-4xl">
          {skillGroups.map((group) => (
            <div key={group.label} className="border-t border-line py-4 first:border-t-0 first:pt-0">
              <dt className="mb-2 text-sm text-muted">{group.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm sm:text-base">{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
