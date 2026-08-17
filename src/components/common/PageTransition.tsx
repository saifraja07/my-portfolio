import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageEnter } from '@/lib/animations';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div variants={pageEnter} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
