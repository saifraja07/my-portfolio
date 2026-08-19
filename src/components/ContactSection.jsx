import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Section from "./Section";
import { social } from "../data/links";

export default function ContactSection() {
  return (
    <Section id="contact" className="border-t border-border">
      <div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-surface/40 px-8 py-14 sm:items-center sm:px-14 sm:text-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Let's build something together.
          </h2>
          <p className="mt-4 max-w-md text-muted sm:mx-auto">
            Have an idea, project, or just want to talk? Feel free to reach
            out.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${social.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            <Mail size={16} strokeWidth={2} />
            Email
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-hover hover:bg-surface"
          >
            <GithubIcon size={16} strokeWidth={1.75} />
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-hover hover:bg-surface"
          >
            <LinkedinIcon size={16} strokeWidth={1.75} />
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
