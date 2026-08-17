import type { CSSProperties } from 'react';
import type { UniverseAccent } from '@/types/navigation';
import { universeNodes } from '@/data/navigation';

export type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;

export interface OrbitRingConfig {
  radius: number;
  /** Parallax depth in px — outer rings drift slightly more than inner ones. */
  parallaxDepth: number;
  /** Subtle deterministic ring tilt, in degrees — keeps rings from reading as perfectly concentric. */
  tilt: number;
}

/** Deterministic, hand-tuned ring tilts — subtle, never extreme. */
const RING_TILT_BY_INDEX = [0, -2, 3, -1];

/** One ring per distinct radius present in the node data — never hardcoded counts. */
export const orbitRings: OrbitRingConfig[] = Array.from(
  new Set(universeNodes.map((node) => node.orbitRadius)),
)
  .sort((a, b) => a - b)
  .map((radius, index) => ({
    radius,
    parallaxDepth: 2 + index * 1.5,
    tilt: RING_TILT_BY_INDEX[index % RING_TILT_BY_INDEX.length],
  }));

export const ACCENT_COLOR_VAR: Record<UniverseAccent, string> = {
  gold: 'var(--color-gold)',
  purple: 'var(--color-purple)',
  cyan: 'var(--color-cyan)',
  blue: 'var(--color-blue)',
  orange: 'var(--color-orange)',
};

export const ACCENT_GLOW_VAR: Record<UniverseAccent, string> = {
  gold: 'var(--glow-gold)',
  purple: 'var(--glow-purple)',
  cyan: 'var(--glow-cyan)',
  blue: 'var(--glow-blue)',
  orange: 'var(--glow-orange)',
};

/** Node parallax depth grows slightly with orbit radius, so outer planets drift a touch more. */
export function parallaxDepthForRadius(radius: number): number {
  const ring = orbitRings.find((item) => item.radius === radius);
  return ring ? ring.parallaxDepth + 3 : 6;
}

/**
 * Solar-system motion profile for a single orbiting node.
 *
 * All values are deterministic (derived from the node's fixed position in
 * `universeNodes` and its data-defined orbit ring), never randomized on
 * render, so the layout is stable across reloads and SSR-safe.
 */
export interface OrbitalMotion {
  /** Orbit size in px, independent of the node's fixed diameter. */
  size: number;
  /** Full revolution time, in seconds — farther rings move slower. */
  orbitDuration: number;
  /** Self-rotation time, in seconds — subtle, decoupled from orbit speed. */
  rotationDuration: number;
  /** Small visual tilt applied to the orbit ring/path, in degrees. */
  orbitTilt: number;
  /** Stacking order so nearer (inner) planets read slightly more forward. */
  zIndex: number;
}

/** Deterministic per-index variation tables — hand-tuned, not random. */
const SIZE_BY_INDEX = [13, 17, 12, 18, 11, 16];
const ORBIT_DURATION_JITTER = [0, 6, 3];
const ROTATION_DURATION_BY_INDEX = [11, 16, 9, 19, 13, 8];
const TILT_BY_INDEX = [0, 2, -3, 4, -2, 3];

/** Base revolution time per ring index — inner rings orbit faster. */
const BASE_ORBIT_DURATION_BY_RING = [24, 40, 58, 78];

export function orbitalMotionForNode(nodeIndex: number, orbitRadius: number): OrbitalMotion {
  const ringIndex = Math.max(
    0,
    orbitRings.findIndex((ring) => ring.radius === orbitRadius),
  );
  const baseDuration =
    BASE_ORBIT_DURATION_BY_RING[ringIndex] ?? BASE_ORBIT_DURATION_BY_RING[BASE_ORBIT_DURATION_BY_RING.length - 1];

  return {
    size: SIZE_BY_INDEX[nodeIndex % SIZE_BY_INDEX.length],
    orbitDuration: baseDuration + ORBIT_DURATION_JITTER[nodeIndex % ORBIT_DURATION_JITTER.length],
    rotationDuration: ROTATION_DURATION_BY_INDEX[nodeIndex % ROTATION_DURATION_BY_INDEX.length],
    orbitTilt: TILT_BY_INDEX[nodeIndex % TILT_BY_INDEX.length],
    zIndex: 10 + nodeIndex,
  };
}