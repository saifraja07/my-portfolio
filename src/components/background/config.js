// Visual + performance parameters for the particle background. Everything tunable lives here.

// One hue for both themes. A muted blue-violet that sits next to the slate-blue `--muted`
// text colour (#a1aab8 / #566070) and complements the coral `--accent`, without competing with it.
export const PARTICLE_COLOR = '#6a7be0'

// Theme only changes intensity, never hue. Lines are 1px so they can be stronger than the dots
// without hurting text; dots are kept moderate so they don't dominate behind copy.
export const THEME_OPACITY = {
  dark: { points: 1.58, lines: 0.3, cursor: 1 },
  light: { points: 1.48, lines: 0.26, cursor: 0.95 },
}

// The OS "reduce motion" preference freezes the scene on one static frame (and disables the
// cursor web). Set to false only if you deliberately want the animation regardless.
export const RESPECT_REDUCED_MOTION = false

// Starting quality tier is picked from device hints; a runtime governor can only step down.
// Every tier keeps the connecting lines: the "web" is the point of the effect.
// There is deliberately no per-tier link cap: every pair of points inside the connection radius is
// connected. Cost is controlled by the particle count (links grow with particles x local density),
// and the line buffers are sized for every possible pair, so nothing eligible is ever dropped.
export const TIERS = {
  high: { maxParticles: 230, areaPerParticle: 5200, maxDpr: 1.5, antialias: true },
  medium: { maxParticles: 150, areaPerParticle: 7000, maxDpr: 1.25, antialias: true },
  low: { maxParticles: 100, areaPerParticle: 10000, maxDpr: 1, antialias: false },
}
export const MIN_PARTICLES = 30

// Governor levels, from cheapest to best. Even the cheapest keeps the web (fewer nodes, same rule).
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
  drift: [0.040, 0.080], // normalised screen-widths per second (constant, visible motion)
  wander: [0.25, 0.7], // rad/s: how quickly each particle's heading meanders (organic, non-linear paths)
  // Connection radius between two particles, in CSS px measured ON SCREEN (the same space the cursor
  // radius uses), so depth never hides a pair that visibly overlaps.
  linkDistance: { min: 100, max: 190, perDiagonal: 0.11 },
  parallax: 12, // subtle secondary effect only; connections are measured on the parallaxed screen position
  parallaxEase: 2.2, // per second
}

// Cursor-connected web. The cursor behaves like one extra node: EVERY particle within `radius`
// (in CSS px, measured on screen) is joined to it by a line that fades with distance. A particle
// entering or leaving the radius fades in/out on its own because the line strength is 0 at the edge.
export const CURSOR = {
  radius: { min: 120, max: 250, perShortSide: 0.29 },
  falloff: 0.7, // line strength = (1 - distance / radius) ^ falloff
  attack: 14, // per second: how fast the whole cursor web fades IN when the pointer enters the page
  release: 5.5, // per second: how fast it fades OUT when the pointer leaves the page
  particleEndFade: 0.7, // line is full strength at the cursor, this fraction at the particle
}
