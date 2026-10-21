import { ArrowUpRight } from 'lucide-react'
import GithubMark from '../ui/GithubMark'
import { projects } from '../../data/projects'
import { siteConfig } from '../../data/siteConfig'

function ProjectPreview({ project }) {
  if (project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={`${project.title} project preview`}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className={`project-preview-art project-preview-${project.id}`} aria-hidden="true">
      <span className="project-preview-grid" />
      <span className="project-preview-mark">{project.previewMark || project.title}</span>
      <span className="project-preview-caption">PROJECT PREVIEW</span>
    </div>
  )
}

export default function Projects() {
  const allProjectsUrl = siteConfig.social.github

  return (
    <section id="projects" aria-labelledby="projects-title" className="shell py-16 lg:py-20">
      <div className="mx-auto max-w-250">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">SELECTED WORK</p>
          <h2 id="projects-title" className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl">
            Things I&apos;ve Built
          </h2>
          <p className="mt-2 text-sm text-muted">A selection of projects I&apos;ve worked on.</p>
        </div>
        {allProjectsUrl ? (
          <a href={allProjectsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg">
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article key={project.id} className="project-card group">
            <a href={`/projects/${project.id}`} className="project-card-main" aria-label={`View details for ${project.title}`}>
              <div className="project-preview">
                <ProjectPreview project={project} />
                <span className="project-preview-open"><ArrowUpRight size={18} aria-hidden="true" /></span>
              </div>
              <div className="project-card-content">
                <p className="text-[10px] tracking-[0.18em] text-muted">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">{project.title}</h3>
                <p className="mt-2 min-h-13 text-sm leading-relaxed text-muted">{project.shortDescription || project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-2.5 py-1 text-[10px] leading-none text-muted">{tech}</li>
                  ))}
                </ul>
              </div>
            </a>
            <div className="project-card-footer">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-fg transition-colors hover:text-accent">
                  Live Demo <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : <span className="text-xs text-muted">In development</span>}
              {project.sourceUrl ? (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg">
                  <GithubMark size={13} /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  )
}
