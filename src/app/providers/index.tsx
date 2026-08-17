import type { ReactNode } from 'react';
import { ReducedMotionProvider } from './ReducedMotionProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <ReducedMotionProvider>{children}</ReducedMotionProvider>;
}
