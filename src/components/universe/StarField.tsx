import { useMemo } from 'react';
import type { CSSVarStyle } from '@/lib/universe';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  twinkle: boolean;
  delay: number;
}

const STAR_COUNT = 70;
const TWINKLE_RATIO = 0.15;

/** Deterministic pseudo-random generator so the field doesn't reshuffle on every render. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(): Star[] {
  const random = mulberry32(1337);
  return Array.from({ length: STAR_COUNT }, (_, id) => ({
    id,
    top: random() * 100,
    left: random() * 100,
    size: 1 + random() * 1.5,
    opacity: 0.25 + random() * 0.5,
    twinkle: random() < TWINKLE_RATIO,
    delay: random() * 4,
  }));
}

export function StarField() {
  const stars = useMemo(generateStars, []);

  return (
    <div className="universe-stars" aria-hidden="true">
      {stars.map((star) => {
        const style: CSSVarStyle = {
          top: `${star.top}%`,
          left: `${star.left}%`,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
          animationDelay: `${star.delay}s`,
          '--star-opacity': star.opacity,
        };
        return (
          <span
            key={star.id}
            className="universe-star"
            data-twinkle={star.twinkle}
            style={style}
          />
        );
      })}
    </div>
  );
}
