import Section from "./Section";

export default function AboutSection() {
  return (
    <Section id="about" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
            About
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-[2rem] lg:leading-snug">
            I'm a developer who enjoys building useful things and solving
            real-world problems.
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-4 text-muted">
          <p>
            I work across the MERN stack, building applications that hold up
            under real use rather than just looking good in a demo.
          </p>
          <p>
            Most of my time goes into backend systems and cloud
            infrastructure — designing APIs, managing deployments, and
            keeping things running reliably.
          </p>
          <p>
            I like picking up new tools when they solve a real problem, and I
            enjoy the process of turning an idea into a working product.
          </p>
        </div>
      </div>
    </Section>
  );
}
