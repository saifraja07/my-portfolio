import { useState } from 'react';
import { StarField } from './StarField';
import { Orbit } from './Orbit';
import { CentralProfile } from './CentralProfile';
import { UniverseNode } from './UniverseNode';
import { universeNodes } from '@/data/navigation';
import { orbitRings, orbitalMotionForNode } from '@/lib/universe';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function UniverseScene() {
  const reducedMotion = usePrefersReducedMotion();
  const parallaxRef = useMouseParallax<HTMLDivElement>({ disabled: reducedMotion, strength: 1 });
  const [hoveredRadius, setHoveredRadius] = useState<number | null>(null);

  return (
    <div
      ref={parallaxRef}
      className="universe-stage relative mx-auto aspect-square w-[min(88vw,620px)]"
    >
      <StarField />

      {orbitRings.map((ring) => (
        <Orbit
          key={ring.radius}
          radius={ring.radius}
          parallaxDepth={ring.parallaxDepth}
          tilt={ring.tilt}
          active={hoveredRadius === ring.radius}
        />
      ))}

      <CentralProfile />

      {universeNodes.map((node, index) => (
        <UniverseNode
          key={node.id}
          node={node}
          motion_={orbitalMotionForNode(index, node.orbitRadius)}
          isHovered={hoveredRadius === node.orbitRadius}
          onHoverChange={setHoveredRadius}
        />
      ))}
    </div>
  );
}
