// Visual + performance parameters for the particle background. Everything tunable lives here.

// One hue for both themes. A muted blue-violet that sits next to the slate-blue `--muted`
// text colour (#a1aab8 / #566070) and complements the coral `--accent`, without competing with it.
export const PARTICLE_COLOR = '#6a7be0'

// Theme only changes intensity, never hue. Lines are 1px so they can be stronger than the dots
// without hurting text; dots are kept moderate so they don't dominate behind copy.
export const THEME_OPACITY = {
  dark: { points: 0.8, lines: 0.75 },
  light: { points: 0.65, lines: 0.62 },
}

// Starting quality tier is picked from device hints; a runtime governor can only step down.
// Every tier keeps the connecting lines: the "web" is the point of the effect.
export const TIERS = {
  high: { maxParticles: 230, areaPerParticle: 5200, maxLinks: 900, maxDpr: 1.5, antialias: true },
  medium: { maxParticles: 150, areaPerParticle: 7000, maxLinks: 560, maxDpr: 1.25, antialias: true },
  low: { maxParticles: 100, areaPerParticle: 10000, maxLinks: 320, maxDpr: 1, antialias: false },
}
export const MIN_PARTICLES = 30

// Governor levels, from cheapest to best. Even the cheapest keeps the web (fewer nodes, same lines).
export const LEVELS = [
  { countScale: 0.55, links: true, dpr: 1 },
  { countScale: 0.8, links: true, dpr: 1 },
  { countScale: 1, links: true, dpr: null }, // null = tier default
]
// Only step down after a long, clearly slow stretch (< ~25 fps average over ~2.5 s).
export const GOVERNOR = { warmupFrames: 60, windowFrames: 150, slowFrameSeconds: 0.04 }

export const SCENE = {
  fov: 50,
  depthNear: 220, // world z of the closest particles (camera sits ~1000+ units away)
  depthFar: -340,
  margin: 1.15, // particles live slightly outside the screen so wrapping is never visible
  size: [2.6, 4.6], // CSS px at the z=0 plane
  drift: [0.012, 0.032], // normalised screen-widths per second (constant, visible motion)
  linkDistance: { min: 120, max: 250, perDiagonal: 0.14 },
  parallax: 26, // max camera shift in world units for pointer movement
  parallaxEase: 2.2, // per second
}
