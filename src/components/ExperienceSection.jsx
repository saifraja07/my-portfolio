import Section from "./Section";
import { timeline } from "../data/timeline";

export default function ExperienceSection() {
  return (
    <Section
      id="journey"
      eyebrow="Journey"
      title="Experience"
      className="border-t border-border"
    >
      <ol className="relative flex flex-col gap-10 border-l border-border pl-8">
        {timeline.map((item) => (
          <li key={item.period} className="relative">
            <span className="absolute top-1.5 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
            <p className="font-mono text-xs tracking-wide text-dim">
              {item.period}
            </p>
            <h3 className="mt-1.5 text-base font-medium text-ink">
              {item.title}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
