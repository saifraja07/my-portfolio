import { ArrowRight } from 'lucide-react'

export default function ProjectRow({ index, project }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <li className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-4 border-b border-line py-8 lg:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)_2.5rem] lg:items-center lg:gap-x-5">
      <span className="pt-0.5 text-lg text-accent" aria-hidden="true">
        {number}.
      </span>

      <div className="min-w-0">
        <h3 className="text-xl font-medium">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} (opens in a new tab)`}
          className="inline-flex size-10 items-center justify-center self-start text-accent transition-transform hover:translate-x-1 lg:col-start-4 lg:row-start-1 lg:self-center"
        >
          <ArrowRight size={22} aria-hidden="true" />
        </a>
      ) : (
        <span className="size-10" aria-hidden="true" />
      )}

      <ul
        aria-label={`${project.title} technologies`}
        className="col-start-2 col-span-2 row-start-2 flex flex-wrap gap-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:justify-end"
      >
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>
    </li>
  )
}
