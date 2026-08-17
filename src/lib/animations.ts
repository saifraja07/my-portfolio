import type { Variants } from 'framer-motion';
import { MOTION_DURATION } from '@/lib/constants';

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.slow, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeIn' },
  },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: MOTION_DURATION.base, ease: 'easeOut' },
  },
};

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeOut' },
  },
};

export const staggerContainer = (stagger = 0.06): Variants => ({
  initial: {},
  animate: {
    transition: { staggerChildren: stagger },
  },
});

/** @deprecated use staggerContainer — kept as an alias to avoid churn in existing call sites. */
export const staggerChildren = staggerContainer;

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: 'easeOut' },
  },
};

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: MOTION_DURATION.fast, ease: 'easeOut' } },
  tap: { scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } },
};

export const imageReveal: Variants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: MOTION_DURATION.slow, ease: 'easeOut' },
  },
};

export const planetHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeOut' },
  },
};

export const orbitalHover: Variants = {
  rest: { opacity: 0.35 },
  hover: {
    opacity: 0.8,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeOut' },
  },
};

export const modalEnter: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: MOTION_DURATION.fast, ease: 'easeIn' },
  },
};

/** Alias for clarity at call sites that only ever use the exit half. */
export const modalExit = modalEnter;
