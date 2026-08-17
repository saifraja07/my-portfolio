export function ProjectProblem({ problem }: { problem: string }) {
  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">The Problem</h2>
      <p className="mt-3 text-ink-muted">{problem}</p>
    </section>
  );
}
