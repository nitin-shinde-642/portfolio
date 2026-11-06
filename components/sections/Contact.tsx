"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";
import { BorderBeam } from "@/components/magicui/border-beam";
import { EASE, viewportConfig } from "@/lib/motion";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.7, 1], [0.85, 1.15, 1.05]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.08, 0.25, 0.15]);

  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please write a message with at least 10 characters.");
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Network error occurred. Please try again or email directly.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative z-10 w-full overflow-x-clip overflow-y-visible py-20 md:py-32"
    >
      {/* Scroll-linked ambient gradient background bloom */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[90vw] h-[700px] rounded-full"
            style={{
              scale: glowScale,
              opacity: glowOpacity,
              background:
                "radial-gradient(circle, #8B5CF6 0%, rgba(34,211,238,0.3) 45%, transparent 70%)",
              filter: "blur(130px)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-[#8B5CF6] uppercase mb-3">
            <span>05 / Contact</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk max-w-2xl"
          >
            Let&apos;s Build&nbsp;
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              Something Useful
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact details & offline resume */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5 space-y-8"
          >
            <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed">
              {profile.contactAvailability}
            </p>

            {/* Contact Rows */}
            <div className="space-y-4">
              {/* Email direct link */}
              <a
                href={`mailto:${profile.email}`}
                className="group flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#111114] p-4 text-left transition-all duration-200 hover:border-[#8B5CF6]/50 hover:bg-[#16161A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#71717A]">Email</span>
                    <span className="block text-sm font-medium text-[#FAFAFA] font-mono">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#22D3EE]">
                  <span>Send</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="group flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#111114] p-4 text-left transition-all duration-200 hover:border-[#22D3EE]/50 hover:bg-[#16161A]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#22D3EE] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#71717A]">Phone</span>
                    <span className="block text-sm font-medium text-[#FAFAFA] font-mono">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-[#71717A] group-hover:text-[#FAFAFA] group-hover:translate-x-1 transition-all"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#111114] p-4 text-left transition-all duration-200 hover:border-white/20 hover:bg-[#16161A]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#71717A]">LinkedIn</span>
                    <span className="block text-sm font-medium text-[#FAFAFA] font-mono">
                      linkedin.com/in/nitin642
                    </span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-[#71717A] group-hover:text-[#FAFAFA] group-hover:translate-x-1 transition-all"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#111114] p-4 text-left transition-all duration-200 hover:border-white/20 hover:bg-[#16161A]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FAFAFA] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#71717A]">GitHub</span>
                    <span className="block text-sm font-medium text-[#FAFAFA] font-mono">
                      github.com/nitin-shinde-642
                    </span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-[#71717A] group-hover:text-[#FAFAFA] group-hover:translate-x-1 transition-all"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Offline review card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111114] p-6">
              <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">
                Prefer to review my experience offline?
              </h3>
              <p className="text-xs text-[#A1A1AA] mb-4">
                Download my comprehensive, printer-friendly PDF resume.
              </p>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[#FAFAFA] transition-all hover:bg-white/10 hover:border-white/20"
              >
                <svg className="w-4 h-4 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form with Border Beam */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[24px] border border-white/[0.08] bg-[#111114] p-8 md:p-10 shadow-2xl">
              {/* Magic UI Border Beam */}
              <BorderBeam
                size={80}
                duration={10}
                colorFrom="#8B5CF6"
                colorTo="#22D3EE"
                borderWidth={1.5}
              />

              <h3 className="text-xl font-bold text-[#FAFAFA] font-space-grotesk mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[#A1A1AA] mb-6">
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono font-medium text-[#A1A1AA] mb-1.5 uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] transition-all focus:border-[#8B5CF6] focus:bg-[#09090B] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono font-medium text-[#A1A1AA] mb-1.5 uppercase tracking-wider"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] transition-all focus:border-[#22D3EE] focus:bg-[#09090B] focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-[#A1A1AA] mb-1.5 uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, role, or team..."
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] transition-all focus:border-[#8B5CF6] focus:bg-[#09090B] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                    {errorMessage}
                  </div>
                )}

                {/* Submit button with states */}
                <div>
                  <button
                    type="submit"
                    disabled={formState === "loading" || formState === "success"}
                    className={`relative w-full overflow-hidden rounded-xl py-3.5 px-6 text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                      formState === "success"
                        ? "bg-emerald-600 hover:bg-emerald-600 cursor-default"
                        : "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-95 active:scale-[0.99] shadow-lg shadow-[#8B5CF6]/20"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {formState === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Send Message
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </motion.span>
                      )}

                      {formState === "loading" && (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </motion.span>
                      )}

                      {formState === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Message Sent Successfully!
                        </motion.span>
                      )}

                      {formState === "error" && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Try Again
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
