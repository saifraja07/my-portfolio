export function ProjectImplementation({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Implementation</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item} className="flex gap-4">
            <span className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
            <p className="text-ink-muted">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
