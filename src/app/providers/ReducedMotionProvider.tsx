import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ReducedMotionContext } from './reducedMotionContext';

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
