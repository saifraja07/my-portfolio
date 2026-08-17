import type { CSSVarStyle } from '@/lib/universe';

interface OrbitProps {
  radius: number;
  parallaxDepth: number;
  active: boolean;
  /** Subtle visual tilt for the ring itself, in degrees. */
  tilt?: number;
}

export function Orbit({ radius, parallaxDepth, active, tilt = 0 }: OrbitProps) {
  const style: CSSVarStyle = {
    width: `${radius * 2}%`,
    height: `${radius * 2}%`,
    '--parallax-depth': `${parallaxDepth}px`,
    '--orbit-tilt': `${tilt}deg`,
  };

  return <div className="universe-orbit" data-active={active} style={style} aria-hidden="true" />;
}
