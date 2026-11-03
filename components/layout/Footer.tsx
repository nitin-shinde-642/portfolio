"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { EASE } from "@/lib/motion";

/* ─── Inline SVG icons ───────────────────────────────────── */
function GithubSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.67 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ArrowUpSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12l7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

/* ─── Social link button ─────────────────────────────────── */
function SocialLink({
  href,
  label,
  children,
  external = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[rgba(139,92,246,0.4)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
      whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once user scrolls past ~100vh
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-[#09090B]"
      role="contentinfo"
    >
      {/* Large faded watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="select-none font-bold text-[#FAFAFA] opacity-[0.03] leading-none"
          style={{ fontSize: "clamp(80px, 18vw, 160px)" }}
        >
          NS.
        </span>
      </div>

      {/* Subtle gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, #8B5CF6 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="font-mono text-xs text-[#A1A1AA] text-center sm:text-left">
            &copy; {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>

          {/* Social icons + back to top */}
          <div className="flex items-center gap-3">
            <SocialLink
              href={`mailto:${socials.email}`}
              label="Send email to Nitin Shinde"
            >
              <EmailSVG className="w-4 h-4" />
            </SocialLink>

            <SocialLink
              href={`tel:${socials.phone.replace(/\s/g, "")}`}
              label="Call Nitin Shinde"
            >
              <PhoneSVG className="w-4 h-4" />
            </SocialLink>

            <SocialLink
              href={socials.github}
              label="Nitin Shinde on GitHub"
              external
            >
              <GithubSVG className="w-4 h-4" />
            </SocialLink>

            <SocialLink
              href={socials.linkedin}
              label="Nitin Shinde on LinkedIn"
              external
            >
              <LinkedinSVG className="w-4 h-4" />
            </SocialLink>

            {/* Divider */}
            <span className="w-px h-5 bg-[rgba(255,255,255,0.08)]" aria-hidden="true" />

            {/* Back to top */}
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Scroll back to top"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE } }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[rgba(139,92,246,0.4)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUpSVG className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
