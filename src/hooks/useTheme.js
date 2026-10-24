import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const THEME_COLORS = { dark: '#0b0b0c', light: '#f6f2e9' }

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// index.html sets data-theme before first paint; read it back as the initial state.
function readInitialTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  // Follow the OS preference only while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event) => {
      if (readStored() === null) setTheme(event.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Keep multiple open tabs in sync when the choice changes in another one.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage unavailable (private mode, etc.): the toggle still works for this session.
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
