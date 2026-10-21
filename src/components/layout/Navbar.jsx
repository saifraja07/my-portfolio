import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import ThemeToggle from './ThemeToggle'

const navIds = siteConfig.navLinks.map((link) => link.id)

export default function Navbar({ theme, onToggleTheme }) {
  const [activeId, pinSection] = useActiveSection(navIds)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const selectLink = (id) => {
    pinSection(id)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-bg">
      <div className="shell">
        <div className="flex h-20 items-center justify-between border-b border-line">
          <a href="/" className="flex items-baseline gap-3 text-lg" aria-label={`${siteConfig.name} home`}>
            <span className="font-semibold text-accent" aria-hidden="true">
              &gt;_
            </span>
            <span className="font-medium">{siteConfig.name}</span>
          </a>

          <div className="flex items-center gap-1">
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-8 text-[0.8125rem] uppercase tracking-wide">
                {siteConfig.navLinks.map((link) => {
                  const active = link.id === activeId
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => selectLink(link.id)}
                        aria-current={active ? 'true' : undefined}
                        className={`transition-colors hover:text-accent ${active ? 'text-accent' : 'text-muted'}`}
                      >
                        {active ? <span aria-hidden="true">[&nbsp;&nbsp;</span> : null}
                        {link.label}
                        {active ? <span aria-hidden="true">&nbsp;&nbsp;]</span> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center text-muted transition-colors hover:text-accent md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          hidden={!menuOpen}
          className="border-b border-line md:hidden"
        >
          <ul className="flex flex-col py-2 text-sm uppercase tracking-wide">
            {siteConfig.navLinks.map((link) => {
              const active = link.id === activeId
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => selectLink(link.id)}
                    aria-current={active ? 'true' : undefined}
                    className={`flex min-h-12 items-center transition-colors hover:text-accent ${active ? 'text-accent' : 'text-muted'}`}
                  >
                    {active ? <span aria-hidden="true">[&nbsp;&nbsp;</span> : null}
                    {link.label}
                    {active ? <span aria-hidden="true">&nbsp;&nbsp;]</span> : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
