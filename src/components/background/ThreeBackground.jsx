import { useEffect, useRef } from 'react'

// Decorative, full-viewport particle layer. Mount ONCE, outside <Routes>, so route changes never
// rebuild it. Three.js is loaded on demand (separate chunk) after first paint, so it cannot delay
// the portfolio content; if the chunk or WebGL fails, the layer just stays empty.
//
// Stacking: the layer is `fixed` with z-index -1 inside the isolated #root stacking context
// (see index.css), i.e. above the page background but below every piece of content.
export default function ThreeBackground() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return undefined

    let cancelled = false
    let handle = null

    const start = () => {
      import('./scene.js')
        .then(({ createBackgroundScene }) => {
          if (cancelled) return // StrictMode / fast unmount: never create a second scene
          handle = createBackgroundScene(layer)
        })
        .catch((error) => {
          if (import.meta.env.DEV) console.warn('[ThreeBackground] failed to load', error)
        })
    }

    // Wait for the browser to be idle so the first paint isn't competing with GL setup.
    let idleId = 0
    let timeoutId = 0
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 1500 })
    else timeoutId = window.setTimeout(start, 250)

    return () => {
      cancelled = true
      if (idleId) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
      handle?.dispose()
      handle = null
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full"
      // Large-viewport height: stays constant when mobile URL bars show/hide, so no resize churn.
      // Browsers without `lvh` ignore this and keep h-full.
      style={{ height: '100lvh' }}
    />
  )
}
