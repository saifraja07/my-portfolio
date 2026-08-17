import type { UniverseAccent } from '@/types/navigation';
import { ACCENT_COLOR_VAR, ACCENT_GLOW_VAR, type CSSVarStyle } from '@/lib/universe';

interface PlanetProps {
  accent: UniverseAccent;
  active: boolean;
  size?: number;
  /** Self-rotation duration in seconds. Omit to keep the surface static. */
  rotationDuration?: number;
}

export function Planet({ accent, active, size = 12, rotationDuration }: PlanetProps) {
  const color = ACCENT_COLOR_VAR[accent];
  const style: CSSVarStyle = {
    width: size,
    height: size,
    // Two light layers: a highlight facing the "sun" (upper-left) and a
    // darker limb toward the shadow side — cheap, static directional shading.
    background: [
      `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${color} 40%, white) 0%, transparent 42%)`,
      `radial-gradient(circle at 68% 74%, color-mix(in srgb, ${color} 65%, black) 0%, transparent 60%)`,
      `radial-gradient(circle at 38% 34%, ${color}, color-mix(in srgb, ${color} 45%, black) 78%)`,
    ].join(', '),
    boxShadow: active ? ACCENT_GLOW_VAR[accent] : 'none',
    ...(rotationDuration ? { '--rotation-duration': `${rotationDuration}s` } : {}),
  };

  return (
    <span
      aria-hidden="true"
      data-spin={rotationDuration ? 'true' : 'false'}
      className="universe-planet-body block rounded-full transition-shadow duration-200"
      style={style}
    />
  );
}
