export function ProjectResults({ results }: { results: string[] }) {
  if (results.length === 0) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Results</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {results.map((result) => (
          <li key={result} className="text-ink-muted">
            — {result}
          </li>
        ))}
      </ul>
    </section>
  );
}
