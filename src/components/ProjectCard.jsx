import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";

export default function ProjectCard({ project }) {
  const { number, title, description, tech, liveUrl, sourceUrl } = project;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface/40 transition-colors duration-300 hover:border-border-hover">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-gradient-to-br from-surface to-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs tracking-widest text-dim uppercase">
            Preview
          </span>
        </div>
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/[0.03]" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-dim">{number}</span>
        </div>

        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-5 border-t border-border pt-5">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
          >
            Live Demo
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <GithubIcon size={15} strokeWidth={1.75} />
            Source
          </a>
        </div>
      </div>
    </article>
  );
}
