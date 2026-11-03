"use client";

import { useScroll } from "motion/react";
import { motion } from "motion/react";

/**
 * ScrollProgress
 * A 2px fixed bar at the very top of the viewport that fills left→right
 * as the user scrolls down the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
