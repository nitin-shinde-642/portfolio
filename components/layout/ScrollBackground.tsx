"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * ScrollBackground
 * Global scroll-driven ambient gradient mesh that stays fixed behind the page content.
 * As the user scrolls through the portfolio, the ambient orbs glide across the screen
 * and transition gracefully between violet (#8B5CF6), cyan (#22D3EE), and indigo (#6366F1).
 */
export function ScrollBackground() {
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  // Primary ambient orb position & scale
  const orb1X = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [
    "20%",
    "75%",
    "25%",
    "80%",
    "50%",
  ]);
  const orb1Y = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [
    "15%",
    "35%",
    "55%",
    "75%",
    "90%",
  ]);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1.1]);
  const orb1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.22, 0.24]);

  // Secondary ambient orb position & scale (counter-motion)
  const orb2X = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [
    "80%",
    "20%",
    "75%",
    "20%",
    "40%",
  ]);
  const orb2Y = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [
    "35%",
    "20%",
    "70%",
    "60%",
    "85%",
  ]);
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.2]);
  const orb2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.14, 0.18, 0.2]);

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary scroll-linked ambient gradient orb */}
      <motion.div
        className="absolute w-[650px] max-w-[85vw] h-[650px] max-h-[85vh] rounded-full"
        style={{
          left: orb1X,
          top: orb1Y,
          x: "-50%",
          y: "-50%",
          scale: orb1Scale,
          opacity: orb1Opacity,
          background:
            "radial-gradient(circle, #8B5CF6 0%, rgba(139,92,246,0.5) 35%, transparent 70%)",
          filter: "blur(130px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Secondary scroll-linked ambient gradient orb (cyan / teal accent) */}
      <motion.div
        className="absolute w-[550px] max-w-[75vw] h-[550px] max-h-[75vh] rounded-full"
        style={{
          left: orb2X,
          top: orb2Y,
          x: "-50%",
          y: "-50%",
          scale: orb2Scale,
          opacity: orb2Opacity,
          background:
            "radial-gradient(circle, #22D3EE 0%, rgba(34,211,238,0.45) 40%, transparent 70%)",
          filter: "blur(120px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Subtle central depth glow that slowly breathes with scroll */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, #8B5CF6 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
