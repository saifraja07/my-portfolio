import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isLight}
      aria-label="Light theme"
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className="inline-flex size-10 items-center justify-center text-muted transition-colors hover:text-accent"
    >
      {isLight ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
