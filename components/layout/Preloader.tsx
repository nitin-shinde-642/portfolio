"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Preloader
 * Shown once per browser session (checked via sessionStorage).
 * Animates "NS." text sliding up from a clip mask, a gradient bar
 * sweeping to full width, then lifts the whole overlay away.
 */
export function Preloader() {
  // Tracks whether we should show at all
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  // Tracks the exit animation trigger
  const [exiting, setExiting] = useState(false);
  // Tracks whether overlay is fully gone
  const [done, setDone] = useState(false);

  useEffect(() => {
    // SSR guard — sessionStorage only in browser
    try {
      if (sessionStorage.getItem("ns_visited")) {
        setShouldShow(false);
        setDone(true);
        return;
      }
    } catch {
      // Private browsing may throw — fall through to show preloader
    }
    setShouldShow(true);

    // Start exit after ~1.3s
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1300);

    return () => clearTimeout(exitTimer);
  }, []);

  // Nothing decided yet — render nothing to avoid flash
  if (shouldShow === null || !shouldShow || done) return null;

  return (
    <AnimatePresence onExitComplete={() => setDone(true)}>
      {!exiting && (
        <motion.div
          className="preloader"
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: EASE },
          }}
          onAnimationComplete={(def) => {
            // After exit animation, mark visited
            if (def === "exit") {
              try {
                sessionStorage.setItem("ns_visited", "1");
              } catch {
                // ignore
              }
            }
          }}
          aria-hidden="true"
          aria-label="Loading portfolio"
          role="status"
        >
          {/* "NS." text with clip-path mask reveal */}
          <div className="preloader-text" aria-hidden="true">
            <motion.span
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{
                clipPath: "inset(0% 0 0 0)",
                transition: { duration: 0.6, ease: EASE, delay: 0.1 },
              }}
              style={{ display: "block" }}
            >
              NS
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                .
              </span>
            </motion.span>
          </div>

          {/* Gradient progress bar — width sweeps 0→100% */}
          <div className="preloader-bar" aria-hidden="true">
            <motion.div
              className="preloader-bar-fill"
              initial={{ width: "0%" }}
              animate={{
                width: "100%",
                transition: { duration: 1.1, ease: EASE, delay: 0.15 },
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
