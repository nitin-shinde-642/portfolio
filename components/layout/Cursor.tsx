"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor
 * Custom cursor rendered only on fine-pointer (non-touch) devices.
 *
 * - .cursor-dot  — 8px filled circle, snaps exactly to the mouse
 * - .cursor-ring — 32px outline circle, lerps to the mouse position
 *
 * State transitions:
 *   - Hover over a/button → ring grows to 48px (.cursor-hover)
 *   - Hover over [data-project-card] → ring grows to 64px + shows "View" (.cursor-project)
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Lerped ring position
  const ringPos = useRef({ x: 0, y: 0 });
  // Actual mouse position
  const mousePos = useRef({ x: 0, y: 0 });
  // RAF handle
  const rafHandle = useRef<number>(0);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── Mouse move: snap dot, lerp ring ──────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    // ── Pointer enter/leave for interactive elements ──────────
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element;

      if (target.closest("[data-project-card]")) {
        ring.classList.add("cursor-project");
        ring.classList.remove("cursor-hover");
      } else if (target.closest("a, button, [role='button']")) {
        ring.classList.add("cursor-hover");
        ring.classList.remove("cursor-project");
      }
    };

    const onPointerOut = () => {
      ring.classList.remove("cursor-hover");
      ring.classList.remove("cursor-project");
    };

    // ── RAF loop: lerp ring to mouse ─────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const LERP_FACTOR = 0.12;

    function tick() {
      if (ring) {
        ringPos.current.x = lerp(
          ringPos.current.x,
          mousePos.current.x,
          LERP_FACTOR
        );
        ringPos.current.y = lerp(
          ringPos.current.y,
          mousePos.current.y,
          LERP_FACTOR
        );

        ring.style.transform = `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      }

      rafHandle.current = requestAnimationFrame(tick);
    }
    rafHandle.current = requestAnimationFrame(tick);

    // ── Hide when leaving window ─────────────────────────────
    const onMouseLeave = () => {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };
    const onMouseEnter = () => {
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafHandle.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      />

      {/* Ring — lerps to cursor */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease" }}
      >
        <span className="cursor-ring-label">View</span>
      </div>
    </>
  );
}
