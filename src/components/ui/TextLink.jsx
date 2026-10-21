import { ArrowUpRight } from 'lucide-react'

// Understated text link with a coral underline and a coral ↗ arrow.
export default function TextLink({ href, external = false, children, className = '' }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a
      href={href}
      {...externalProps}
      className={`group inline-flex items-center gap-2 border-b-2 border-accent pb-1.5 transition-colors hover:text-accent ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={14} strokeWidth={2.25} className="text-accent" aria-hidden="true" />
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  )
}
