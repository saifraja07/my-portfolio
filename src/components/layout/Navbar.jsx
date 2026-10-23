import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { siteConfig } from '../../data/siteConfig'
import { socialLinks } from '../ui/socialLinks'
import { GithubIcon } from '../ui/BrandIcons'

const navIds = siteConfig.navLinks.map((link) => link.id)

const navButtonBase = 'inline-flex min-h-[2.35rem] items-center justify-center rounded-[.55rem] border border-line text-fg [transition:border-color_160ms_ease,background-color_160ms_ease,color_160ms_ease,transform_160ms_ease] hover:bg-[color:color-mix(in_srgb,var(--fg)_9%,transparent)]'
const menuEyebrow = 'text-[.58rem] leading-[1.4] tracking-[.19em] text-muted'
const menuSection = 'border-b border-line p-4'
const menuList = 'mt-[.65rem] flex flex-col gap-[.1rem]'
const themeOptionBase = 'inline-flex min-h-[2.35rem] items-center justify-center gap-[.45rem] rounded-[.35rem] border text-[.68rem] [transition:border-color_150ms_ease,color_150ms_ease,background-color_150ms_ease]'
const themeOptionSelected = 'border-accent bg-[color:color-mix(in_srgb,var(--accent)_5%,transparent)] text-fg'
const themeOptionIdle = 'border-line text-muted hover:bg-[color:color-mix(in_srgb,var(--fg)_7%,transparent)] hover:text-fg'
const exploreLinkBase = 'flex min-h-[1.8rem] items-center rounded-[.3rem] px-[.45rem] text-[.7rem] [transition:color_140ms_ease,padding-left_140ms_ease] hover:bg-[color:color-mix(in_srgb,var(--fg)_7%,transparent)] hover:pl-[.7rem] motion-reduce:hover:pl-[.45rem]'
const exploreLinkActive = 'text-fg before:mr-2 before:size-1 before:rounded-[50%] before:bg-accent'
const connectItemBase = 'flex min-h-[1.8rem] items-center gap-[.6rem] text-[.7rem] text-muted [transition:color_140ms_ease] [&_svg]:flex-none'
const instagramIconClass = '[stroke-width:2.2] flex-none'

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
      <header className="sticky top-0 z-50 bg-bg">
        <div className="shell">
          <div className="flex h-15 items-center justify-between border-b border-line">
            <Link className="inline-flex min-h-[2.4rem] items-center rounded-[.45rem] px-[.45rem] py-[.2rem] transition-colors duration-160 ease-[ease] hover:bg-[color-mix(in_srgb,var(--fg)_7%,transparent)]" to="/" onClick={() => selectLink('home')} aria-label="saif.dev home">
              <span className="text-[1.02rem] font-bold tracking-[-.055em] text-fg">saif<span className="text-accent">.dev</span></span>
            </Link>
            <div className="flex items-center gap-[.55rem]">
              <a
                href={siteConfig.social.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${navButtonBase} gap-[.55rem] px-3 text-[.78rem] hover:transform-[translateY(-1px)] motion-reduce:hover:transform-none`}
                aria-label="Visit GitHub profile"
              >
                <GithubIcon size={17} />
                <span>GitHub</span>
              </a>
              <button
                type="button"
                className={`${navButtonBase} w-[2.4rem]`}
                onClick={onToggleTheme}
                aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
                title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
              >
                {isLight ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              </button>
              <button
                type="button"
                className={`${navButtonBase} w-[2.4rem]`}
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

      <div
        className={`fixed inset-0 z-60 bg-[rgb(0_0_0/48%)] backdrop-blur-[2px] [transition:opacity_240ms_ease,visibility_240ms_ease] ${menuOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <aside
        id="site-menu-drawer"
        className={`fixed inset-y-0 right-0 z-61 flex w-[min(100%,320px)] flex-col overflow-y-auto overscroll-contain border-l border-line bg-bg text-fg [transition:transform_280ms_cubic-bezier(.2,.75,.25,1),visibility_280ms_ease] md:w-[320px] ${menuOpen ? 'visible transform-[translateX(0)] [box-shadow:-18px_0_48px_rgb(0_0_0/18%)]' : 'invisible transform-[translateX(102%)] [box-shadow:-18px_0_48px_rgb(0_0_0/0%)]'}`}
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex min-h-[3.45rem] items-center justify-between border-b border-line px-4 py-[.65rem]">
          <span className={menuEyebrow}>MENU</span>
          <button type="button" className="inline-flex size-[1.85rem] items-center justify-center rounded-[.35rem] border border-line text-fg [transition:border-color_150ms_ease,color_150ms_ease] hover:bg-[color-mix(in_srgb,var(--fg)_9%,transparent)]" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <section className={menuSection} aria-label="Profile">
          <p className={menuEyebrow}>PROFILE</p>
          <div className="mt-[.8rem] flex items-center gap-3">
            <div className="grid size-[2.65rem] flex-none place-items-center rounded-[50%] border border-line bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] text-[.8rem] text-fg" aria-hidden="true">SA</div>
            <div className="flex min-w-0 flex-col leading-[1.55]">
              <strong className="text-[.78rem] font-semibold">{siteConfig.fullName}</strong>
              <span className="text-[.62rem] text-accent">MERN Stack Developer</span>
              <span className="text-[.58rem] text-muted">Focused on backend, cloud &amp; DevOps</span>
            </div>
          </div>
        </section>

        <section className={menuSection} aria-label="Appearance">
          <p className={menuEyebrow}>APPEARANCE</p>
          <div className="mt-[.8rem] grid grid-cols-[1fr_1fr] gap-[.4rem]">
            <button type="button" className={`${themeOptionBase} ${isLight ? themeOptionSelected : themeOptionIdle}`} onClick={() => { if (!isLight) onToggleTheme() }} aria-pressed={isLight}>
              <Sun size={14} aria-hidden="true" /> Light
            </button>
            <button type="button" className={`${themeOptionBase} ${!isLight ? themeOptionSelected : themeOptionIdle}`} onClick={() => { if (isLight) onToggleTheme() }} aria-pressed={!isLight}>
              <Moon size={14} aria-hidden="true" /> Dark
            </button>
          </div>
        </section>

        <nav className={menuSection} aria-label="Explore">
          <p className={menuEyebrow}>EXPLORE</p>
          <ul className={menuList}>
            {siteConfig.navLinks.map((link) => {
              const active = link.id === activeId
              const isCurrent = !isProjectPage && active
              return (
                <li key={link.id}>
                  <Link to={isProjectPage ? `/${link.href}` : link.href} onClick={() => selectLink(link.id)} aria-current={isCurrent ? 'location' : undefined} className={`${exploreLinkBase} ${isCurrent ? exploreLinkActive : 'text-muted hover:text-fg'}`}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <section className={menuSection} aria-label="Connect">
          <p className={menuEyebrow}>CONNECT</p>
          <ul className={menuList}>
            {socialLinks.map((link) => (
              <li key={link.id}>
                {link.href ? (
                  <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={() => setMenuOpen(false)} className={`${connectItemBase} rounded-[.3rem] px-[.45rem] hover:bg-[color-mix(in_srgb,var(--fg)_7%,transparent)] hover:text-fg`}>
                    <link.Icon size={15} className={link.id === 'instagram' ? instagramIconClass : undefined} aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <span className={`${connectItemBase} opacity-55`} title={`${link.label} link not configured`}>
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
