import { useCallback, useEffect, useRef, useState } from 'react'

// Tracks which section is "current" for the nav.
// - Scrolling: the last section whose top has passed the sticky header wins.
// - Clicking a nav link pins that section (short sections near the page bottom can't
//   scroll to the top) until the visitor scrolls manually.
export function useActiveSection(ids, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0])
  const pinned = useRef(null)

  const pin = useCallback((id) => {
    pinned.current = id
    setActiveId(id)
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (pinned.current) return
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = ids[ids.length - 1]
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const release = () => {
      pinned.current = null
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchstart', release, { passive: true })
    window.addEventListener('keydown', release)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', release)
      window.removeEventListener('keydown', release)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return [activeId, pin]
}
