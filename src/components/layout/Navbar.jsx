import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { siteConfig } from '../../data/siteConfig'
import { socialLinks } from '../ui/socialLinks'
import { GithubIcon } from '../ui/BrandIcons'

const navIds = siteConfig.navLinks.map((link) => link.id)
const exploreLinks = [
  { id: 'home', label: 'Overview', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Stack', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme, isProjectPage = false }) {
  const [activeId, pinSection] = useActiveSection(navIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const isLight = theme === 'light'

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const selectLink = (id) => {
    pinSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      <header className="site-navbar sticky top-0 z-50 bg-bg">
        <div className="shell">
          <div className="site-navbar-inner flex h-16 items-center justify-between border-b border-line">
            <Link className="navbar-brand" to="/" onClick={() => selectLink('home')} aria-label="saif.dev home">
              <span className="navbar-brand-name">saif<span>.dev</span></span>
            </Link>
            <div className="site-navbar-actions flex items-center gap-2">
              <a
                href={siteConfig.social.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-github"
                aria-label="Visit GitHub profile"
              >
                <GithubIcon size={17} />
                <span>GitHub</span>
              </a>
              <button
                type="button"
                className="navbar-icon-button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
                title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
              >
                {isLight ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              </button>
              <button
                type="button"
                className="navbar-icon-button"
                aria-expanded={menuOpen}
                aria-controls="site-menu-drawer"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`site-menu-backdrop${menuOpen ? ' is-open' : ''}`} aria-hidden="true" onClick={() => setMenuOpen(false)} />
      <aside
        id="site-menu-drawer"
        className={`site-menu-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="site-menu-top">
          <span className="site-menu-eyebrow">MENU</span>
          <button type="button" className="site-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <section className="site-menu-profile" aria-label="Profile">
          <p className="site-menu-eyebrow">PROFILE</p>
          <div className="site-menu-profile-row">
            <div className="site-menu-avatar" aria-hidden="true">SA</div>
            <div className="site-menu-profile-copy">
              <strong>{siteConfig.fullName}</strong>
              <span className="site-menu-role">MERN Stack Developer</span>
              <span className="site-menu-bio">Focused on backend, cloud &amp; DevOps</span>
            </div>
          </div>
        </section>

        <section className="site-menu-appearance" aria-label="Appearance">
          <p className="site-menu-eyebrow">APPEARANCE</p>
          <div className="site-menu-theme-options">
            <button type="button" className={`site-menu-theme-option${isLight ? ' is-selected' : ''}`} onClick={() => { if (!isLight) onToggleTheme() }} aria-pressed={isLight}>
              <Sun size={14} aria-hidden="true" /> Light
            </button>
            <button type="button" className={`site-menu-theme-option${!isLight ? ' is-selected' : ''}`} onClick={() => { if (isLight) onToggleTheme() }} aria-pressed={!isLight}>
              <Moon size={14} aria-hidden="true" /> Dark
            </button>
          </div>
        </section>

        <nav className="site-menu-explore" aria-label="Explore">
          <p className="site-menu-eyebrow">EXPLORE</p>
          <ul>
            {exploreLinks.map((link) => {
              const active = link.id === activeId
              return (
                <li key={link.id}>
                  <Link to={isProjectPage ? `/${link.href}` : link.href} onClick={() => selectLink(link.id)} aria-current={!isProjectPage && active ? 'location' : undefined} className={!isProjectPage && active ? 'is-active' : ''}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <section className="site-menu-connect" aria-label="Connect">
          <p className="site-menu-eyebrow">CONNECT</p>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={() => setMenuOpen(false)}>
                    <link.Icon size={15} className={`social-brand-icon social-brand-icon-${link.id}`} aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <span className="site-menu-social-unavailable" title={`${link.label} link not configured`}>
                    <link.Icon size={15} aria-hidden="true" /><span>{link.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  )
}
