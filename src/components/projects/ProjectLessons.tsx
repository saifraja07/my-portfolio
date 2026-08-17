export function ProjectLessons({ lessons }: { lessons: string[] }) {
  if (lessons.length === 0) return null;

  return (
    <section className="rounded-lg border border-hairline p-6">
      <h2 className="text-eyebrow text-gold-soft">What I Learned</h2>
      <div className="mt-4 flex flex-col gap-3">
        {lessons.map((lesson) => (
          <p key={lesson} className="text-ink">
            {lesson}
          </p>
        ))}
      </div>
    </section>
  );
}
