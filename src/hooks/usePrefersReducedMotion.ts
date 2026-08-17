import { useContext } from 'react';
import { ReducedMotionContext } from '@/app/providers/reducedMotionContext';

export function usePrefersReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}
