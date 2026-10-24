import { socialLinks } from '../ui/socialLinks'

const socialLinkBase = 'inline-flex size-11 items-center justify-center rounded-full border border-transparent text-muted [transition:color_160ms_ease,background-color_160ms_ease,border-color_160ms_ease,transform_160ms_ease]'
const socialLinkHover = 'hover:border-line hover:bg-[color:color-mix(in_srgb,var(--fg)_5%,transparent)] hover:text-fg hover:[transform:translateY(-2px)] motion-reduce:hover:[transform:none]'
const iconExtra = (id) => (id === 'instagram' ? '[stroke-width:2.2] flex-none [filter:drop-shadow(0_0_.15px_currentColor)]' : '')

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="shell pt-7 pb-6" aria-label="Footer">
      <div className="flex flex-col items-center gap-4 border-t border-line pt-6">
        <nav aria-label="Social links">
          <ul className="flex flex-wrap items-center justify-center gap-[clamp(1.1rem,3.5vw,1.75rem)]">
            {socialLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <a
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${socialLinkBase} ${socialLinkHover}`}
                  >
                    <link.Icon size={link.id === 'instagram' ? 21 : 19} strokeWidth={1.8} className={iconExtra(link.id)} aria-hidden="true" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                ) : (
                  <span className={`${socialLinkBase} cursor-default opacity-35`} aria-label={`${link.label} link not configured`} title={`${link.label} not configured`}>
                    <link.Icon size={link.id === 'instagram' ? 21 : 19} strokeWidth={1.8} className={iconExtra(link.id)} aria-hidden="true" />
                    <span className="sr-only">{link.label} link not configured</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p className="flex flex-wrap items-center justify-center gap-2 text-center text-[.68rem] tracking-[.015em] text-muted">© {year} Saif Ali Raja <span aria-hidden="true">·</span> Built with care.</p>
      </div>
    </footer>
  )
}
