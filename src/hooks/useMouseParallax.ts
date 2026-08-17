import { useEffect, useRef } from 'react';

interface UseMouseParallaxOptions {
  /** Disables tracking entirely, e.g. when the user prefers reduced motion. */
  disabled?: boolean;
  /** Maximum offset, in the same units the CSS consuming the variables expects. */
  strength?: number;
}

/**
 * Tracks pointer position and writes normalized offsets to CSS custom
 * properties (--parallax-x / --parallax-y) on the returned element, via
 * requestAnimationFrame. Deliberately avoids React state so mouse movement
 * never triggers a re-render.
 */
export function useMouseParallax<T extends HTMLElement>({
  disabled = false,
  strength = 1,
}: UseMouseParallaxOptions = {}) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node || disabled) return;

    const applyFrame = () => {
      node.style.setProperty('--parallax-x', target.current.x.toFixed(3));
      node.style.setProperty('--parallax-y', target.current.y.toFixed(3));
      frame.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength;
      target.current = { x, y };

      if (frame.current === null) {
        frame.current = requestAnimationFrame(applyFrame);
      }
    };

    const handlePointerLeave = () => {
      target.current = { x: 0, y: 0 };
      if (frame.current === null) {
        frame.current = requestAnimationFrame(applyFrame);
      }
    };

    node.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerleave', handlePointerLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [disabled, strength]);

  return ref;
}
