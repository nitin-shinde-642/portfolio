"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

// ─── Dynamically loaded (client-only) components ──────────────
const Preloader = dynamic(
  () => import("@/components/layout/Preloader").then((m) => m.Preloader),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () =>
    import("@/components/layout/ScrollProgress").then(
      (m) => m.ScrollProgress
    ),
  { ssr: false }
);

const CommandPalette = dynamic(
  () =>
    import("@/components/layout/CommandPalette").then(
      (m) => m.CommandPalette
    ),
  { ssr: false }
);

const ScrollBackground = dynamic(
  () =>
    import("@/components/layout/ScrollBackground").then(
      (m) => m.ScrollBackground
    ),
  { ssr: false }
);

// Stats and Marquee sections — lazy loaded below the fold
const Stats = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.Stats),
  { ssr: false }
);

const MarqueeSection = dynamic(
  () =>
    import("@/components/sections/MarqueeSection").then(
      (m) => m.MarqueeSection
    ),
  { ssr: false }
);

export default function HomePage() {
  const lenisRef = useRef<import("lenis").default | null>(null);

  // ─── Lenis smooth scroll initialisation ──────────────────────
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let rafId: number;

    async function initLenis() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });
      lenisRef.current = lenis;

      // Add lenis class for CSS targeting
      document.documentElement.classList.add("lenis");

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        document.documentElement.classList.remove("lenis");
      }
    };
  }, []);

  return (
    <>
      {/* Preloader — shows once per session */}
      <Preloader />

      {/* Global scroll-driven ambient gradient background */}
      <ScrollBackground />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Command palette (Ctrl/Cmd+K) */}
      <CommandPalette />

      {/* Navigation */}
      <Navbar />

      {/* ── Main content ── */}
      <main id="main-content" className="relative z-10 w-full max-w-full overflow-x-clip">
        <Hero />
        <Stats />
        <MarqueeSection />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
