export default function Section({ id, eyebrow, title, description, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-20 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-12 sm:mb-16">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-xl text-muted">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
