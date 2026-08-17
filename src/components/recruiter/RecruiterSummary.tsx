import { profile } from '@/data/profile';

export function RecruiterSummary() {
  return (
    <section id="summary" className="scroll-mt-20 border-b border-hairline py-10">
      <h2 className="text-eyebrow text-gold-soft">Summary</h2>
      <p className="mt-4 max-w-2xl text-ink-muted">{profile.summary}</p>
      <p className="mt-3 max-w-2xl text-ink-muted">{profile.introduction.body[0]}</p>
    </section>
  );
}
