export function ProjectChallenges({ challenges }: { challenges: string[] }) {
  if (challenges.length === 0) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Challenges</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {challenges.map((challenge) => (
          <li key={challenge} className="rounded-lg border border-hairline p-4 text-ink-muted">
            {challenge}
          </li>
        ))}
      </ul>
    </section>
  );
}
