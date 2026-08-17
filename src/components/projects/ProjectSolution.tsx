export function ProjectSolution({ approach }: { approach: string }) {
  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">The Approach</h2>
      <p className="mt-3 text-ink-muted">{approach}</p>
    </section>
  );
}
