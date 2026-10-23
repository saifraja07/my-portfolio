import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GithubMark from '../ui/GithubMark'
import ProjectPreviewArt from '../ui/ProjectPreviewArt'

const detailLabel = 'text-[.65rem] tracking-[.16em] text-muted'
const detailBack = 'inline-flex items-center gap-[.55rem] text-[.85rem] text-muted transition-colors duration-160 ease-[ease] hover:text-fg'
const detailAction = 'inline-flex min-h-[2.7rem] items-center justify-center gap-[.55rem] rounded-[.45rem] border px-[.9rem] py-[.65rem] text-[.85rem] transition-[border-color,color,background-color] duration-160 ease-[ease]'
const detailActionPrimary = `${detailAction} border-fg bg-fg text-bg hover:opacity-85`
const detailActionSecondary = `${detailAction} border-line hover:border-fg`

function DetailPreview({ project }) {
  return (
    <div className="aspect-video max-h-168 w-full overflow-hidden rounded-[.65rem] border border-line bg-bg [box-shadow:0_24px_80px_rgb(0_0_0/.12)]">
      {project.previewImage ? (
        <img src={project.previewImage} alt={`${project.title} project preview`} className="block h-full w-full object-fill object-top" />
      ) : (
        <ProjectPreviewArt project={project} />
      )}
    </div>
  )
}

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div className="shell pt-[clamp(1.5rem,4vw,3rem)]">
        <Link to="/#projects" className={detailBack}><ArrowLeft size={16} /> Back to projects</Link>
        <p className="mt-16 text-sm text-center text-muted">something went wrong.</p>
        <h1 className="mt-4 mb-12 text-center text-3xl font-semibold">Project not found</h1>
      </div>
    )
  }

  return (
    <div className="shell pt-[clamp(1.5rem,4vw,3rem)]">
      <nav className="flex min-h-11 flex-wrap items-center gap-[.8rem] max-[640px]:border-b max-[640px]:border-line max-[640px]:pb-5" aria-label="Breadcrumb">
        <Link to="/#projects" className={detailBack}><ArrowLeft size={16} aria-hidden="true" /> Back to projects</Link>
        {/* <span className="text-[.8rem] text-line" aria-hidden="true">/</span> */}
        {/* <span className="text-xs text-muted">{project.title}</span> */}
      </nav>

      <section className="max-w-225 pt-[clamp(1.75rem,2vw,5.5rem)] pb-10">
        <p className="text-xs tracking-[0.18em] text-muted">PROJECT / {project.id.toUpperCase()}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{project.longDescription || project.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className={detailActionPrimary}>Visit live project <ArrowUpRight size={16} /></a> : null}
          {project.sourceUrl ? <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className={detailActionSecondary}><GithubMark size={15} /> Visit source code <ArrowUpRight size={14} /></a> : null}
        </div>
      </section>

      <DetailPreview project={project} />

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(15rem,.8fr)] gap-[clamp(2rem,7vw,6rem)] py-[clamp(3rem,7vw,5.5rem)] max-[640px]:grid-cols-[minmax(0,1fr)]">
        <section>
          <p className={detailLabel}>01 / OVERVIEW</p>
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
        <aside className="flex flex-col gap-10">
          <div>
            <p className={detailLabel}>02 / TECH STACK</p>
            <ul className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <li key={tech} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{tech}</li>)}</ul>
          </div>
          {project.role ? <div><p className={detailLabel}>03 / MY ROLE</p><p className="mt-3 text-sm leading-relaxed text-muted">{project.role}</p></div> : null}
          {project.challenges ? <div><p className={detailLabel}>04 / ENGINEERING NOTES</p><p className="mt-3 text-sm leading-relaxed text-muted">{project.challenges}</p></div> : null}
        </aside>
      </div>
    </div>
  )
}
