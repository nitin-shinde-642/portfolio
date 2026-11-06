"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { aboutContent } from "@/lib/data";
import { EASE, viewportConfig } from "@/lib/motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function SpotlightCard({ children, className = "", delay = 0 }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`relative group overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#111114] p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${className}`}
    >
      {/* Spotlight radial gradient following cursor */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.16), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top inner gradient highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ["65%", "25%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["10%", "70%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative z-10 w-full overflow-x-clip overflow-y-visible py-20 md:py-32"
    >
      {/* Scroll-linked background gradient aura */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute w-[500px] max-w-[80vw] h-[500px] rounded-full"
            style={{
              left: glowX,
              top: glowY,
              x: "-50%",
              y: "-50%",
              opacity: glowOpacity,
              background:
                "radial-gradient(circle, #8B5CF6 0%, rgba(34,211,238,0.3) 50%, transparent 70%)",
              filter: "blur(110px)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-[#8B5CF6] uppercase mb-3">
            <span>01 / About</span>
          </div>
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk"
          >
            A bit about me
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tile 1: Large 2x2 "Story" */}
          <SpotlightCard className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between" delay={0.1}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold tracking-wider text-[#22D3EE] uppercase">
                  Philosophy & Approach
                </span>
                <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#FAFAFA] font-space-grotesk mb-6">
                Clean code, robust architectures, and dependable delivery.
              </h3>
              <div className="space-y-4 text-sm md:text-base text-[#A1A1AA] leading-relaxed">
                {aboutContent.story.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#71717A] font-mono">Specialization</p>
                <p className="text-sm font-semibold text-[#FAFAFA]">Full-Stack & Backend PHP / Laravel / WP</p>
              </div>
            </div>
          </SpotlightCard>

          {/* Tile 2: Quick Facts */}
          <SpotlightCard className="lg:col-span-2" delay={0.2}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#8B5CF6] uppercase">
                Quick Facts
              </span>
              <svg className="w-4 h-4 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <dl className="space-y-3.5 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 pb-3 border-b border-white/[0.06]">
                <dt className="text-[#71717A] font-mono text-xs">Location</dt>
                <dd className="text-[#FAFAFA] font-medium">{aboutContent.facts.location}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 pb-3 border-b border-white/[0.06]">
                <dt className="text-[#71717A] font-mono text-xs">Education</dt>
                <dd className="text-[#FAFAFA] font-medium sm:text-right max-w-sm">
                  {aboutContent.facts.education}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <dt className="text-[#71717A] font-mono text-xs">Languages</dt>
                <dd className="text-[#FAFAFA] font-medium">
                  {aboutContent.facts.languages.join(" • ")}
                </dd>
              </div>
            </dl>
          </SpotlightCard>

          {/* Tile 3: Award */}
          <SpotlightCard className="relative overflow-hidden" delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#EAB308] uppercase">
                Recognition
              </span>
              {/* Shine sweep trophy icon */}
              <div className="relative">
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-8 h-8 rounded-lg bg-[#EAB308]/10 text-[#EAB308] flex items-center justify-center shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <h4 className="text-base font-bold text-[#FAFAFA] font-space-grotesk mt-2">
              Emerging Leader Award
            </h4>
            <p className="mt-1 text-xs text-[#A1A1AA] leading-relaxed">
              SiGa Systems Pvt. Ltd. — awarded for proactive project ownership and technical excellence.
            </p>
          </SpotlightCard>

          {/* Tile 4: Stylized Dark Pune Map */}
          <SpotlightCard className="flex flex-col justify-between" delay={0.35}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#22D3EE] uppercase">
                Base
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]" />
                </span>
                <span className="text-[11px] font-mono text-[#22D3EE]">Pune, IN</span>
              </div>
            </div>

            {/* Stylized vector map graphic */}
            <div className="my-2 relative h-28 w-full rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full opacity-40" viewBox="0 0 200 100" fill="none">
                <path d="M10 80 Q 40 20, 80 50 T 150 30 T 190 70" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M20 30 Q 70 80, 120 40 T 180 80" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="100" cy="50" r="18" fill="rgba(139, 92, 246, 0.1)" />
                <circle cx="100" cy="50" r="8" fill="rgba(34, 211, 238, 0.2)" />
                <circle cx="100" cy="50" r="3" fill="#22D3EE" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] bg-[#111114]/90 px-2 py-0.5 rounded border border-white/10">
                  18.5204° N, 73.8567° E
                </span>
              </div>
            </div>
            <p className="text-xs text-[#71717A] text-center font-mono">
              Available for immediate on-site or remote roles
            </p>
          </SpotlightCard>

          {/* Tile 5: What I've built */}
          <SpotlightCard className="lg:col-span-4" delay={0.4}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#A1A1AA] uppercase">
                Production Systems Delivered
              </span>
              <span className="text-xs font-mono text-[#8B5CF6]">30+ Projects</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "E-Commerce Stores", icon: "🛒", tech: "WooCommerce / Dokan" },
                { label: "Subscription Apps", icon: "🔄", tech: "Recurring billing & retries" },
                { label: "Job Boards", icon: "📋", tech: "Paid listings & tiers" },
                { label: "Marketing Integrations", icon: "⚡", tech: "Eloqua / CRMs" },
                { label: "HRMS Systems", icon: "🏢", tech: "Attendance, leave, APIs" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-colors hover:border-[#8B5CF6]/30 hover:bg-white/[0.04]"
                >
                  <span className="text-xl mb-1.5 block">{item.icon}</span>
                  <p className="text-xs font-semibold text-[#FAFAFA] font-sans">{item.label}</p>
                  <p className="text-[11px] text-[#71717A] font-mono mt-0.5">{item.tech}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
