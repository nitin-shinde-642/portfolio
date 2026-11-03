"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll for sticky blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map(({ href }) =>
      document.getElementById(href.replace("#", ""))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Trap scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[color:var(--background)]/90 backdrop-blur-md border-b border-[color:var(--border)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto max-w-[1200px] px-4 sm:px-6 flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="#home"
            className="font-mono text-sm font-semibold text-[color:var(--text)] hover:text-[color:var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded"
            aria-label="Nitin Shinde — Go to top"
          >
            NS<span className="text-[color:var(--accent)]">.</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                    activeSection === href.replace("#", "")
                      ? "text-[color:var(--accent)] bg-[color:var(--accent)]/10"
                      : "text-[color:var(--muted)] hover:text-[color:var(--text)]"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              aria-label="Download resume PDF"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          "fixed top-16 right-0 bottom-0 z-50 w-72 bg-[color:var(--surface)] border-l border-[color:var(--border)] flex flex-col p-6 transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={handleNavClick}
                  className={cn(
                    "flex px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeSection === href.replace("#", "")
                      ? "text-[color:var(--accent)] bg-[color:var(--accent)]/10"
                      : "text-[color:var(--text)] hover:bg-[color:var(--background)]"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-[color:var(--border)]">
          <a
            href={profile.resumeUrl}
            download
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-colors"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
