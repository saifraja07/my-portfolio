import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import GithubMark from '../ui/GithubMark'
import ProjectPreviewArt from '../ui/ProjectPreviewArt'
import { projects } from '../../data/projects'
import { siteConfig } from '../../data/siteConfig'

// "hoverable:" = hover-capable fine pointer AND viewport wider than 700px (see @custom-variant in index.css).
// Everywhere else (phones, touch, <=700px) there are no hover effects and the CTA button is always visible.
// The preview <Link> is `group/preview`; its hover / focus-visible / active state drives the children.
const previewLinkClass = [
  'group/preview flex min-w-0 flex-col items-center gap-4 [-webkit-tap-highlight-color:transparent]',
  'focus-visible:outline-offset-[6px] hoverable:gap-0',
].join(' ')

// Reserves room above the laptop for the tooltip (no layout shift) and hosts the soft ground shadow.
const mediaClass = [
  'relative block w-full hoverable:pt-21',
  "hoverable:after:pointer-events-none hoverable:after:absolute hoverable:after:inset-x-[14%] hoverable:after:bottom-[1%] hoverable:after:-z-1 hoverable:after:h-[7%] hoverable:after:rounded-[50%] hoverable:after:content-['']",
  'hoverable:after:bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.38),transparent_70%)]',
  'hoverable:after:opacity-0 hoverable:after:[transform:scaleX(0.9)]',
  'hoverable:after:[transition:opacity_360ms_ease,transform_460ms_cubic-bezier(.2,.75,.25,1)]',
  'hoverable:group-hover/preview:after:opacity-100 hoverable:group-hover/preview:after:[transform:scaleX(1.05)]',
  'hoverable:group-focus-visible/preview:after:opacity-100 hoverable:group-focus-visible/preview:after:[transform:scaleX(1.05)]',
  'motion-reduce:hoverable:after:[transform:scaleX(1.05)]! motion-reduce:hoverable:after:[transition:opacity_200ms_ease]!',
].join(' ')

const imageClass = [
  'block h-auto w-full',
  'hoverable:origin-bottom hoverable:will-change-transform hoverable:[transition:transform_460ms_cubic-bezier(.22,1.25,.36,1)]',
  'hoverable:group-hover/preview:[transform:translateY(-10px)_scale(1.06)]',
  'hoverable:group-focus-visible/preview:[transform:translateY(-10px)_scale(1.06)]',
  'hoverable:group-active/preview:[transform:translateY(-5px)_scale(1.03)] hoverable:group-active/preview:duration-140',
  // Reduced motion (e.g. Windows "Animation effects" off): no lift or spring, just a small, quick scale so hover still gives feedback.
  // "!" is needed to win over the global reduced-motion rule in index.css that zeroes every transition.
  'motion-reduce:hoverable:[transition:transform_200ms_ease-out]!',
  'motion-reduce:hoverable:group-hover/preview:[transform:scale(1.03)]! motion-reduce:hoverable:group-focus-visible/preview:[transform:scale(1.03)]!',
  'motion-reduce:hoverable:group-active/preview:[transform:scale(1.015)]!',
].join(' ')

// Shared look of the desktop tooltip and the always-visible button.
const actionBaseClass = 'items-center gap-[.45rem] bg-accent text-[.8rem] font-semibold tracking-[.02em] whitespace-nowrap text-bg'

// Desktop tooltip above the laptop, with a caret (::after).
const tipClass = [
  `${actionBaseClass} hidden hoverable:pointer-events-none hoverable:absolute hoverable:top-0 hoverable:left-1/2 hoverable:inline-flex`,
  'hoverable:rounded-lg hoverable:px-4 hoverable:py-[.55rem] hoverable:shadow-[0_12px_26px_-12px_rgb(0_0_0/0.55)]',
  'hoverable:opacity-0 hoverable:[transform:translate(-50%,10px)_scale(.94)]',
  'hoverable:[transition:opacity_220ms_ease,transform_360ms_cubic-bezier(.22,1.25,.36,1)]',
  'hoverable:group-hover/preview:opacity-100 hoverable:group-hover/preview:[transform:translate(-50%,0)_scale(1)]',
  'hoverable:group-focus-visible/preview:opacity-100 hoverable:group-focus-visible/preview:[transform:translate(-50%,0)_scale(1)]',
  "hoverable:after:absolute hoverable:after:left-1/2 hoverable:after:-bottom-[.3rem] hoverable:after:size-[.65rem] hoverable:after:rounded-[0_0_.12rem_0] hoverable:after:bg-inherit hoverable:after:content-['']",
  'hoverable:after:[transform:translateX(-50%)_rotate(45deg)]',
  'motion-reduce:[transform:translate(-50%,0)]! motion-reduce:[transition:opacity_150ms_ease]!',
].join(' ')

const tipIconClass = [
  '[transition:transform_220ms_cubic-bezier(.2,.75,.25,1)]',
  'hoverable:group-hover/preview:[transform:translate(2px,-2px)] hoverable:group-focus-visible/preview:[transform:translate(2px,-2px)]',
  'motion-reduce:[transform:none]!',
].join(' ')

// Permanent button under the laptop on phones, touch devices and anything <=700px wide.
const ctaClass = [
  `${actionBaseClass} inline-flex min-h-11 justify-center rounded-lg px-[1.4rem] py-[.55rem] hoverable:hidden`,
  '[box-shadow:0_8px_20px_-12px_color-mix(in_srgb,var(--accent)_70%,#000)]',
  '[transition:transform_150ms_ease] group-active/preview:[transform:scale(.97)]',
].join(' ')

const linkClass = 'inline-flex items-center gap-[.4rem] text-[.8rem] font-medium underline-offset-4 [transition:color_180ms_ease,transform_180ms_ease] hover:[transform:translateY(-2px)]'

function ProjectPreview({ project }) {
  if (project.laptop?.src) {
    return (
      <img
        src={project.laptop.src}
        width={project.laptop.width}
        height={project.laptop.height}
        alt={`${project.title} project preview`}
        className={imageClass}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className="aspect-[1.6/1] w-full overflow-hidden border border-line">
      <ProjectPreviewArt project={project} aria-hidden="true" />
    </div>
  )
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

        <div className="mt-11 flex flex-col gap-10 max-[700px]:mt-9 max-[700px]:gap-12">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={project.id}
                className={`grid items-center gap-[clamp(1.5rem,3.5vw,3rem)] max-[860px]:grid-cols-[minmax(0,1fr)] max-[860px]:gap-5 ${reverse ? 'grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]' : 'grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]'}`}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className={`${previewLinkClass} max-[860px]:order-2 ${reverse ? 'order-2' : ''}`}
                  aria-label={`Explore ${project.title} project details`}
                >
                  <span className={mediaClass}>
                    <span className={tipClass} aria-hidden="true">
                      Explore Project <ExternalLink size={14} className={tipIconClass} />
                    </span>
                    <ProjectPreview project={project} />
                  </span>
                  <span className={ctaClass} aria-hidden="true">
                    Explore Project <ExternalLink size={15} />
                  </span>
                </Link>

                <div className={`min-w-0 py-2 max-[860px]:px-[.1rem] max-[860px]:py-0 max-[860px]:order-1 ${reverse ? 'order-1' : ''}`}>
                  <span className="mb-[.55rem] block text-[clamp(2.6rem,4vw,3.5rem)] leading-none font-semibold tracking-[-.08em] text-[color-mix(in_srgb,var(--fg)_15%,transparent)]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {project.category ? <p className="mb-[.55rem] text-[.58rem] font-semibold tracking-[.13em] text-accent">{project.category}</p> : null}
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
