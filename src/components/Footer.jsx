import { social } from "../data/links";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-dim sm:flex-row sm:justify-between">
        <p>© 2026 Saif Ali Raja</p>
        <div className="flex items-center gap-1.5">
          <a href={social.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-muted">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-muted">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${social.email}`} className="transition-colors hover:text-muted">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
