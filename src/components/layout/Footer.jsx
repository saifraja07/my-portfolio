import { socialLinks } from '../ui/socialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer shell" aria-label="Footer">
      <div className="footer-inner">
        <nav aria-label="Social links">
          <ul className="footer-socials">
            {socialLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <a
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="footer-social-link"
                  >
                    <link.Icon size={link.id === 'instagram' ? 21 : 19} strokeWidth={1.8} className={`social-brand-icon social-brand-icon-${link.id}`} aria-hidden="true" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                ) : (
                  <span className="footer-social-link footer-social-unavailable" aria-label={`${link.label} link not configured`} title={`${link.label} not configured`}>
                    <link.Icon size={link.id === 'instagram' ? 21 : 19} strokeWidth={1.8} className={`social-brand-icon social-brand-icon-${link.id}`} aria-hidden="true" />
                    <span className="sr-only">{link.label} link not configured</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer-copyright">© {year} Saif Ali Raja <span aria-hidden="true">·</span> Built with care.</p>
      </div>
    </footer>
  )
}
