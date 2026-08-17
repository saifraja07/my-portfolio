export function ProjectHighlights({ highlights }: { highlights: string[] }) {
  if (highlights.length === 0) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Features</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {highlights.map((highlight, index) => (
          <li key={highlight} className="flex gap-3">
            <span className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-ink-muted">{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
