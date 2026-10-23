// Styled placeholder shown when a project has no preview image.
export default function ProjectPreviewArt({ project, ...props }) {
  return (
    <div
      className="relative grid size-full place-items-center overflow-hidden [background:radial-gradient(ellipse_at_50%_120%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_55%),linear-gradient(145deg,color-mix(in_srgb,var(--bg)_92%,var(--fg)),var(--bg))]"
      {...props}
    >
      <span className="absolute inset-0 opacity-25 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-size-[28px_28px] mask-[linear-gradient(to_bottom,transparent,black_35%,black_75%,transparent)]" />
      <span className="z-1 max-w-[85%] text-center text-[clamp(1.1rem,2vw,1.65rem)] font-medium tracking-[-.06em] text-muted">
        {project.previewMark || project.title}
      </span>
      <span className="absolute bottom-4 left-0 z-1 w-full text-center text-[.55rem] tracking-[.2em] text-muted opacity-75">
        PROJECT PREVIEW
      </span>
    </div>
  )
}
