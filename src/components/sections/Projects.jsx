import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GithubMark from '../ui/GithubMark'
import ProjectPreviewArt from '../ui/ProjectPreviewArt'
import { projects } from '../../data/projects'
import { siteConfig } from '../../data/siteConfig'

// The preview <Link> is the `group/preview`; its hover/focus drives every overlay and the frame/image motion.
const frameClass = [
  'relative aspect-[1.35/1] overflow-hidden border border-line max-[700px]:aspect-[16/10]',
  'bg-[color:color-mix(in_srgb,var(--bg)_91%,var(--fg))] [box-shadow:0_8px_28px_-24px_#000]',
  '[transition:transform_360ms_cubic-bezier(.2,.75,.25,1),border-color_260ms_ease,box-shadow_360ms_ease]',
  'group-hover/preview:[transform:translateY(-6px)_scale(1.018)]',
  'group-hover/preview:border-[color:color-mix(in_srgb,var(--accent)_65%,var(--border))]',
  'group-hover/preview:[box-shadow:0_22px_45px_-24px_color-mix(in_srgb,#000_85%,transparent),0_0_0_1px_color-mix(in_srgb,var(--accent)_12%,transparent)]',
  'group-focus-visible/preview:[transform:translateY(-6px)_scale(1.018)]',
  'group-focus-visible/preview:border-[color:color-mix(in_srgb,var(--accent)_65%,var(--border))]',
  'group-focus-visible/preview:[box-shadow:0_22px_45px_-24px_color-mix(in_srgb,#000_85%,transparent),0_0_0_1px_color-mix(in_srgb,var(--accent)_12%,transparent)]',
  'motion-reduce:group-hover/preview:[transform:none] motion-reduce:group-hover/preview:[box-shadow:none]',
].join(' ')

const imageClass = [
  'block size-full object-fill object-center',
  '[transition:transform_600ms_cubic-bezier(.2,.75,.25,1),filter_300ms_ease]',
  'group-hover/preview:[transform:scale(1.045)] group-hover/preview:[filter:saturate(1.06)]',
  'group-focus-visible/preview:[transform:scale(1.045)] group-focus-visible/preview:[filter:saturate(1.06)]',
  'motion-reduce:group-hover/preview:[transform:none]',
].join(' ')

// Shared by both floating badges: hidden until hover/focus, always visible on phones.
const overlayClass = [
  'absolute border bg-[color:color-mix(in_srgb,var(--bg)_86%,transparent)] text-fg backdrop-blur-[10px]',
  'opacity-0 [transform:translateY(5px)] [transition:opacity_220ms_ease,transform_220ms_ease]',
  'group-hover/preview:opacity-100 group-hover/preview:[transform:translateY(0)]',
  'group-focus-visible/preview:opacity-100 group-focus-visible/preview:[transform:translateY(0)]',
  'max-[700px]:opacity-100 max-[700px]:[transform:none]',
].join(' ')

const openClass = `${overlayClass} top-4 right-4 grid size-[2.4rem] place-items-center rounded-[50%] border-[color:color-mix(in_srgb,var(--border)_75%,transparent)]`
const hintClass = `${overlayClass} right-[.8rem] bottom-[.8rem] inline-flex items-center gap-[.4rem] px-[.65rem] py-[.45rem] text-[.55rem] tracking-[.1em] border-[color:color-mix(in_srgb,var(--border)_70%,transparent)]`

const linkClass = 'inline-flex items-center gap-[.4rem] text-[.8rem] font-medium underline-offset-4 [transition:color_180ms_ease,transform_180ms_ease] hover:[transform:translateY(-2px)]'

function ProjectPreview({ project }) {
  if (project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={`${project.title} project preview`}
        className={imageClass}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return <ProjectPreviewArt project={project} aria-hidden="true" />
}

export default function Projects() {
  const allProjectsUrl = siteConfig.social.github

  return (
    <section id="projects" aria-labelledby="projects-title" className="shell pt-16 pb-16 lg:pb-24">
      <div className="mx-auto max-w-250">
        <div>
          <p className="mb-[.6rem] text-[.62rem] font-semibold tracking-[.18em] text-accent">WORK</p>
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

        <div className="mt-11 flex flex-col gap-16 max-[700px]:mt-9 max-[700px]:gap-12">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={project.id}
                className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] items-center gap-[clamp(2rem,4.5vw,4rem)] max-[700px]:grid-cols-[minmax(0,1fr)] max-[700px]:gap-5"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className={`group/preview block min-w-0 outline-offset-[6px] max-[700px]:order-2 ${reverse ? 'order-2' : ''}`}
                  aria-label={`View ${project.title} project page`}
                >
                  <div className={frameClass}>
                    <ProjectPreview project={project} />
                    <span className={openClass}><ArrowUpRight size={19} aria-hidden="true" /></span>
                    <span className={hintClass}>EXPLORE PROJECT <ArrowUpRight size={12} aria-hidden="true" /></span>
                  </div>
                </Link>

                <div className={`min-w-0 py-2 max-[700px]:px-[.1rem] max-[700px]:py-0 max-[700px]:order-1 ${reverse ? 'order-1' : ''}`}>
                  <span className="mb-[.55rem] block text-[clamp(2.6rem,4vw,3.5rem)] leading-none font-semibold tracking-[-.08em] text-[color-mix(in_srgb,var(--fg)_15%,transparent)]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mb-[.55rem] text-[.58rem] font-semibold tracking-[.13em] text-accent">{project.category || (project.id === 'browseros' ? 'BROWSER-BASED OPERATING SYSTEM' : project.id === 'storageapp' ? 'CLOUD STORAGE SAAS' : 'OBSERVABILITY & INFRASTRUCTURE')}</p>
                  <h3 className="text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.2] font-semibold tracking-[-.045em]">{project.title}</h3>
                  <p className="mt-[.65rem] max-w-136 text-[.9rem] leading-[1.75] text-muted">{project.shortDescription || project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-[.6rem] gap-y-[.45rem] text-[.55rem] tracking-widest text-muted uppercase" aria-label={`${project.title} technologies`}>
                    {project.tech.map((tech) => <li key={tech} className="not-first:before:mr-[.6rem] not-first:before:text-accent not-first:before:content-['·']">{tech}</li>)}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-fg hover:text-accent`}>
                        Live Demo <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : <span className="text-xs text-muted">Live demo coming soon</span>}
                    {project.sourceUrl ? (
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-muted hover:text-fg`}>
                        <GithubMark size={14} /> Source <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
