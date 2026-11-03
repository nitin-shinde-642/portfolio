// Motion tokens and reusable variants for Framer Motion
// Used across all sections to keep animations consistent

import type { Transition, Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition: Transition = {
  duration: 0.7,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const chipPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE },
  },
};

export const cardHover = {
  y: -6,
  transition: { duration: 0.3, ease: EASE },
};

export const viewportConfig = {
  once: true,
  amount: 0.3,
} as const;
