"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/* ─── Nav links ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
] as const;

/* ─── Hamburger icon ─────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        x1="3" y1="6" x2="19" y2="6"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{ transformOrigin: "11px 6px" }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="16" x2="19" y2="16"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{ transformOrigin: "11px 16px" }}
      />
    </svg>
  );
}

/* ─── Mobile overlay ─────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden:  { opacity: 0, y: -16, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, ease: EASE },
  },
  exit: {
    opacity: 0, y: -12, scale: 0.97,
    transition: { duration: 0.22, ease: EASE },
  },
};

const staggerList = {
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const linkItem = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

/* ─── Main component ─────────────────────────────────────── */
export function Navbar() {
  const [visible,      setVisible]      = useState(true);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  /* scroll-based hide / show */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = lastScrollY.current;
    if (current < 60) {
      setVisible(true);
    } else if (current > prev + 6) {
      setVisible(false);
      setMobileOpen(false);
    } else if (prev - current > 6) {
      setVisible(true);
    }
    lastScrollY.current = current;
  });

  /* active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* body scroll lock when mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* escape closes mobile menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#8B5CF6] focus:text-white focus:text-sm focus:font-medium focus:outline-none"
      >
        Skip to content
      </a>

      {/* Floating pill navbar */}
      <motion.div
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <header
          className="pointer-events-auto w-full max-w-3xl"
          role="banner"
        >
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between gap-4 h-14 px-4 sm:px-5 rounded-full backdrop-blur-xl bg-[rgba(9,9,11,0.75)] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            {/* Logo */}
            <Link
              href="#home"
              aria-label="Nitin Shinde — scroll to top"
              className="font-mono text-base font-bold text-[#FAFAFA] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-sm"
              style={{ fontFamily: "var(--font-space-grotesk, var(--font-inter))" }}
            >
              NS<span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">.</span>
            </Link>

            {/* Desktop links */}
            <ul
              role="list"
              className="hidden md:flex items-center gap-1 relative"
            >
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive  = activeSection === sectionId;
                return (
                  <li key={href} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute inset-0 rounded-full bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.3)]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={href}
                      className={cn(
                        "relative z-10 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                        isActive
                          ? "text-[#FAFAFA]"
                          : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right: Resume button + Ctrl K chip + hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#FAFAFA] transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                style={{
                  background: "linear-gradient(#09090B, #09090B) padding-box, linear-gradient(135deg, #8B5CF6, #22D3EE) border-box",
                  border: "1.5px solid transparent",
                }}
                aria-label="Open resume PDF in new tab"
              >
                Resume
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
                }}
                className="hidden lg:inline-flex items-center px-2 py-1 rounded-full text-[11px] font-mono bg-white/[0.06] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/10 hover:border-white/20 transition-colors"
                aria-label="Open command palette (Ctrl K)"
              >
                Ctrl K
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-overlay"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.06)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </nav>
        </header>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-[rgba(9,9,11,0.6)] backdrop-blur-sm md:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-24 left-4 right-4 z-50 md:hidden rounded-2xl backdrop-blur-xl bg-[rgba(9,9,11,0.92)] border border-[rgba(255,255,255,0.08)] shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <motion.ul
                role="list"
                className="flex flex-col p-4 gap-1"
                variants={staggerList}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map(({ label, href }) => {
                  const sectionId = href.replace("#", "");
                  const isActive  = activeSection === sectionId;
                  return (
                    <motion.li key={href} variants={linkItem}>
                      <Link
                        href={href}
                        onClick={closeMobile}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                          isActive
                            ? "bg-[rgba(139,92,246,0.15)] text-[#FAFAFA] border border-[rgba(139,92,246,0.3)]"
                            : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)]"
                        )}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Resume inside drawer */}
              <div className="px-4 pb-4">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(34,211,238,0.2))",
                    border: "1px solid rgba(139,92,246,0.4)",
                  }}
                >
                  View Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
