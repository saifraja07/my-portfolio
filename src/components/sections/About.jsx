import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-16 lg:py-20">
      <div className="mx-auto max-w-250">
        <SectionHeading title="About" id="about-title" />
        <p className="mt-5 max-w-5xl text-base leading-8 text-muted sm:text-[1.0625rem]">
          I&rsquo;m Saif Ali Raja, a MERN Stack Developer from India. I care about code quality,
           platform fundamentals, and creating tools that are genuinely useful, whether that&rsquo;s an
           interactive learning platform, a reference for engineers, or a technical side project
           built from scratch. Interested in backend development, programming languages,
           cryptocurrencies, cloud computing, DevOps, and building products that make a difference.
        </p>
      </div>
    </section>
  )
}
