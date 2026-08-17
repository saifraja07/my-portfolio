import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { UniverseNode as UniverseNodeData } from '@/types/navigation';
import { Planet } from './Planet';
import type { CSSVarStyle, OrbitalMotion } from '@/lib/universe';
import { planetHover } from '@/lib/animations';

interface UniverseNodeProps {
  node: UniverseNodeData;
  motion_: OrbitalMotion;
  isHovered: boolean;
  onHoverChange: (radius: number | null) => void;
}

/**
 * Renders one orbiting node using a rotating-frame + counter-rotation
 * technique: an outer track continuously rotates around the stage center
 * (placing the node at its orbit radius), while an inner anchor spins at the
 * exact same rate in reverse so the label/planet content stays upright.
 * Both are pure CSS animations — no per-frame JS/React state involved.
 */
export function UniverseNode({ node, motion_, isHovered, onHoverChange }: UniverseNodeProps) {
  const trackStyle: CSSVarStyle = {
    '--initial-angle': `${node.orbitAngle}deg`,
    '--orbit-duration': `${motion_.orbitDuration}s`,
    zIndex: motion_.zIndex,
  };

  const anchorStyle: CSSVarStyle = {
    '--orbit-radius': `${node.orbitRadius}%`,
    '--initial-angle': `${node.orbitAngle}deg`,
    '--orbit-duration': `${motion_.orbitDuration}s`,
  };

  return (
    <div className="universe-orbit-track" style={trackStyle} aria-hidden="false">
      <div className="universe-orbit-anchor" style={anchorStyle}>
        <Link
          to={node.route}
          aria-label={`${node.label} — ${node.description}`}
          className="group flex flex-col items-center gap-2 rounded-full p-2"
          onPointerEnter={() => onHoverChange(node.orbitRadius)}
          onPointerLeave={() => onHoverChange(null)}
          onFocus={() => onHoverChange(node.orbitRadius)}
          onBlur={() => onHoverChange(null)}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            variants={planetHover}
            initial="rest"
            whileHover="hover"
            whileFocus="hover"
            whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
          >
            <Planet
              accent={node.accent}
              active={isHovered}
              size={motion_.size}
              rotationDuration={motion_.rotationDuration}
            />
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-ink-faint transition-colors group-hover:text-gold-soft group-focus-visible:text-gold-soft">
                {node.number}
              </span>
              <span className="text-xs text-ink-muted transition-colors group-hover:text-ink group-focus-visible:text-ink">
                {node.label}
              </span>
              <span className="max-w-[14ch] text-center text-[10px] text-ink-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {node.description}
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
