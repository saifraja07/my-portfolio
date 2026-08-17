import { profile, siteConfig } from '@/data/profile';

export function CentralProfile() {
  return (
    <div className="universe-core flex w-[min(80vw,320px)] flex-col items-center text-center">
      {/* Faint outer halo — the widest, softest layer. */}
      <div
        aria-hidden="true"
        className="universe-sun-halo absolute -inset-16 -z-10 rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-gold) 12%, transparent) 0%, transparent 72%)',
        }}
      />
      {/* Soft inner glow — the original warm wash, kept close to the core. */}
      <div
        aria-hidden="true"
        className="universe-sun-glow absolute -inset-10 -z-10 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-gold) 22%, transparent) 0%, transparent 70%)',
        }}
      />
      <div className="rounded-full border border-hairline px-3 py-1">
        <p className="text-eyebrow text-gold-soft">{profile.greeting}</p>
      </div>
      <h1 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">{profile.fullName}</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
        {profile.role}
      </p>
      <p className="mt-4 max-w-[26ch] text-sm text-ink-muted">{siteConfig.tagline}</p>
      <p className="mt-3 text-xs text-ink-faint">{siteConfig.location}</p>
    </div>
  );
}
