import TextLink from '../ui/TextLink'

export default function Hero() {
  return (
    <section id="top-hero" aria-labelledby="hero-title" className="relative isolate">
      {/* Reserved slot for the future Three.js background (Phase 5). Intentionally empty. */}
      <div data-hero-background aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />

      <div className="shell relative">
        <div className="pb-20 pt-16 sm:pt-20 lg:ps-10 lg:pb-28 lg:pt-24">
          <p className="flex items-center gap-4 text-[0.8125rem] uppercase tracking-wide">
            <span className="h-0.5 w-10 bg-accent sm:w-16" aria-hidden="true" />
            Saif Ali Raja
          </p>

          <h1
            id="hero-title"
            className="mt-8 max-w-[22ch] text-[clamp(2.5rem,7.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
          >
            I build <span className="text-accent">useful things</span> for the web.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
            A MERN Stack Developer passionate about building full-stack applications, backend systems, and
            scalable cloud infrastructure.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
            <TextLink href="#projects">Explore projects</TextLink>
            <TextLink href="#contact">Get in touch</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
