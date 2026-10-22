import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GithubMark from '../ui/GithubMark'
import { projects } from '../../data/projects'
import { siteConfig } from '../../data/siteConfig'

function ProjectPreview({ project }) {
  if (project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={`${project.title} project preview`}
        className="project-showcase-image"
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
    <section id="projects" aria-labelledby="projects-title" className="shell projects-section py-16 lg:py-24">
      <div className="mx-auto max-w-250">
        <div className="projects-heading">
          <p className="projects-eyebrow">WORK</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="projects-title" className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl">
                Things I&apos;ve Built
              </h2>
              <p className="mt-2 text-sm text-muted">A selection of projects I&apos;ve worked on.</p>
            </div>
            {allProjectsUrl ? (
              <a href={allProjectsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg">
                All projects on GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="projects-showcase">
          {projects.map((project, index) => (
            <article key={project.id} className={`project-showcase-row ${index % 2 ? 'project-showcase-row-reverse' : ''}`}>
              <Link to={`/projects/${project.id}`} className="project-showcase-preview" aria-label={`View ${project.title} project page`}>
                <div className="project-showcase-frame">
                  <ProjectPreview project={project} />
                  <span className="project-showcase-open"><ArrowUpRight size={19} aria-hidden="true" /></span>
                  <span className="project-showcase-hint">EXPLORE PROJECT <ArrowUpRight size={12} aria-hidden="true" /></span>
                </div>
              </Link>

              <div className="project-showcase-info">
                <span className="project-showcase-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <p className="project-showcase-category">{project.category || (project.id === 'browseros' ? 'BROWSER-BASED OPERATING SYSTEM' : project.id === 'storageapp' ? 'CLOUD STORAGE SAAS' : 'OBSERVABILITY & INFRASTRUCTURE')}</p>
                <h3 className="project-showcase-title">{project.title}</h3>
                <p className="project-showcase-description">{project.shortDescription || project.description}</p>
                <ul className="project-showcase-tech" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <div className="project-showcase-links">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-showcase-link project-showcase-link-primary">
                      Live Demo <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : <span className="text-xs text-muted">Live demo coming soon</span>}
                  {project.sourceUrl ? (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-showcase-link">
                      <GithubMark size={14} /> Source <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
