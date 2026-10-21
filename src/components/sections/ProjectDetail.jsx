import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import GithubMark from '../ui/GithubMark'

function DetailPreview({ project }) {
  return (
    <div className="project-detail-preview">
      {project.previewImage ? (
        <img src={project.previewImage} alt={`${project.title} project preview`} className="h-full w-full object-fill object-top" />
      ) : (
        <div className={`project-preview-art project-preview-${project.id}`}>
          <span className="project-preview-grid" />
          <span className="project-preview-mark">{project.previewMark || project.title}</span>
          <span className="project-preview-caption">PROJECT PREVIEW</span>
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail({ project, theme, onToggleTheme }) {
  if (!project) {
    return (
      <main className="shell project-detail-page">
        <a href="/#projects" className="detail-back"><ArrowLeft size={16} /> Back to projects</a>
        <p className="mt-16 text-sm text-muted">That project could not be found.</p>
        <h1 className="mt-2 text-3xl font-semibold">Project not found</h1>
        <a href="/#projects" className="mt-6 inline-flex text-sm text-accent hover:underline">Browse all projects →</a>
      </main>
    )
  }

  return (
    <main className="shell project-detail-page">
      <header className="project-detail-header">
        <a href="/#projects" className="detail-back"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a>
        <div className="flex items-center gap-4 text-xs text-muted">
          <a href="/" className="transition-colors hover:text-fg">saif.dev</a>
          <span aria-hidden="true">/</span>
          <span>Projects</span>
          <button type="button" onClick={onToggleTheme} className="ml-1 rounded-full border border-line px-3 py-1.5 transition-colors hover:text-fg" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <section className="project-detail-intro">
        <p className="text-xs tracking-[0.18em] text-muted">PROJECT / {project.id.toUpperCase()}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{project.longDescription || project.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="detail-action-primary">Visit live project <ArrowUpRight size={16} /></a> : null}
          {project.sourceUrl ? <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="detail-action"><GithubMark size={15} /> Visit source code <ArrowUpRight size={14} /></a> : null}
        </div>
      </section>

      <DetailPreview project={project} />

      <div className="project-detail-grid">
        <section>
          <p className="detail-label">01 / OVERVIEW</p>
          <h2 className="mt-3 text-2xl font-medium">About the project</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{project.overview || project.longDescription || project.description}</p>
          {project.highlights?.length ? (
            <>
              <h3 className="mt-8 text-lg font-medium">Key features</h3>
              <ul className="mt-3 space-y-3">
                {project.highlights.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted"><span className="text-accent" aria-hidden="true">↳</span><span>{item}</span></li>)}
              </ul>
            </>
          ) : null}
        </section>
        <aside className="project-detail-sidebar">
          <div>
            <p className="detail-label">02 / TECH STACK</p>
            <ul className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <li key={tech} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{tech}</li>)}</ul>
          </div>
          {project.role ? <div><p className="detail-label">03 / MY ROLE</p><p className="mt-3 text-sm leading-relaxed text-muted">{project.role}</p></div> : null}
          {project.challenges ? <div><p className="detail-label">04 / ENGINEERING NOTES</p><p className="mt-3 text-sm leading-relaxed text-muted">{project.challenges}</p></div> : null}
        </aside>
      </div>

      <footer className="project-detail-bottom">
        <a href="/#projects" className="detail-back"><ArrowLeft size={16} aria-hidden="true" /> Back to all projects</a>
        <a href="/" className="text-sm text-muted transition-colors hover:text-fg">Back to portfolio home ↗</a>
      </footer>
    </main>
  )
}
