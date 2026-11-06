"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experience } from "@/lib/data";
import { Calendar, MapPin } from "lucide-react";
import { EASE, viewportConfig } from "@/lib/motion";

// ─── Animation variants ────────────────────────────────────────────────────────

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE, delay: i * 0.1 },
  }),
};

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const extraBulletsVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: EASE },
  },
};

const extraBulletItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

// ─── Animated timeline line ────────────────────────────────────────────────────

interface TimelineLineProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

function TimelineLine({ containerRef }: TimelineLineProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      className="absolute left-0 top-0 hidden md:block pointer-events-none"
      style={{
        left: "calc(50% - 0.5px)",
        width: "1px",
        height: "100%",
      }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Background track */}
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100%"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      {/* Animated fill */}
      <motion.line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100%"
        stroke="url(#timelineGrad)"
        strokeWidth="1"
        style={{ pathLength }}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Impact metric row ─────────────────────────────────────────────────────────

function ImpactRow({ summary }: { summary: string }) {
  const parts = summary.split("|").map((s) => s.trim());

  return (
    <div
      className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 sm:p-4 rounded-xl border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.04)]"
      role="note"
      aria-label="Impact summary"
    >
      {parts.map((part, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-lg bg-[rgba(17,17,20,0.85)] px-3.5 py-2.5 border border-[rgba(255,255,255,0.06)] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" aria-hidden="true" />
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {part}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Experience card ───────────────────────────────────────────────────────────

interface ExperienceCardProps {
  item: (typeof experience)[number];
  index: number;
}

const INITIAL_BULLETS = 3;

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(cardRef, { ...viewportConfig, once: true });
  const isNodeInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const [showMore, setShowMore] = useState(false);

  const visibleBullets = item.bullets.slice(0, INITIAL_BULLETS);
  const hiddenBullets = item.bullets.slice(INITIAL_BULLETS);
  const hasMore = hiddenBullets.length > 0;

  return (
    <li className="relative flex gap-0">
      {/* ── Desktop: timeline node on center line ── */}
      <div className="hidden md:flex flex-col items-center w-1/2 pr-10">
        {/* Left side: empty for right-side layout OR content */}
        <div className="w-full flex justify-end">
          {/* Date on left */}
          <p className="flex items-center gap-1.5 font-mono text-xs text-[#A1A1AA] mt-6 text-right">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <time dateTime={`${item.startDate}`}>{item.startDate}</time>
            <span aria-hidden="true">–</span>
            <time dateTime={`${item.endDate}`}>{item.endDate}</time>
          </p>
        </div>
      </div>

      {/* ── Timeline node ── */}
      <div className="hidden md:flex flex-col items-center relative z-10">
        <motion.span
          ref={nodeRef}
          variants={nodeVariants}
          initial="hidden"
          animate={isNodeInView ? "visible" : "hidden"}
          className="relative flex h-5 w-5 items-center justify-center flex-shrink-0 mt-5"
          aria-hidden="true"
        >
          <motion.span
            animate={
              isNodeInView
                ? {
                    boxShadow: [
                      "0 0 0px 0px rgba(139,92,246,0)",
                      "0 0 12px 4px rgba(139,92,246,0.5)",
                      "0 0 8px 2px rgba(139,92,246,0.3)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute h-full w-full rounded-full bg-[rgba(139,92,246,0.3)]"
          />
          <span className="relative h-3 w-3 rounded-full border-2 border-[#8B5CF6] bg-[#111114]" />
        </motion.span>
      </div>

      {/* ── Card ── */}
      <div
        ref={cardRef}
        className="w-full md:w-1/2 md:pl-10 pb-16"
      >
        {/* Mobile: date row */}
        <p className="flex md:hidden items-center gap-1.5 font-mono text-xs text-[#A1A1AA] mb-3 pl-8">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          <time>{item.startDate}</time>
          <span aria-hidden="true">–</span>
          <time>{item.endDate}</time>
        </p>

        {/* Mobile: left line node */}
        <span
          className="md:hidden absolute left-4 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center mt-1"
          aria-hidden="true"
        >
          <span className="absolute h-full w-full rounded-full bg-[rgba(139,92,246,0.3)] animate-ping opacity-75" />
          <span className="relative h-3 w-3 rounded-full border-2 border-[#8B5CF6] bg-[#111114]" />
        </span>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE, delay: index * 0.15 }}
          className="bg-[#111114] rounded-[20px] border border-[rgba(255,255,255,0.08)] p-6 md:p-8 shadow-sm"
        >
          {/* Role */}
          <h3 className="text-xl font-bold text-[#FAFAFA] font-['Space_Grotesk',sans-serif]">
            {item.role}
          </h3>

          {/* Company + location */}
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm font-medium">
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {item.company}
            </span>
            <span className="text-[rgba(255,255,255,0.08)]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#A1A1AA]">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {item.location}
            </span>
          </p>

          {/* Bullets — always-visible first 3 */}
          <ul className="mt-5 space-y-2.5" role="list">
            {visibleBullets.map((bullet, bi) => (
              <motion.li
                key={bi}
                custom={bi}
                variants={bulletVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex gap-3 text-sm text-[#A1A1AA] leading-relaxed"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]"
                  aria-hidden="true"
                />
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Expandable extra bullets */}
          {hasMore && (
            <>
              <AnimatePresence>
                {showMore && (
                  <motion.ul
                    key="extra-bullets"
                    variants={extraBulletsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-2.5 overflow-hidden"
                    role="list"
                    aria-label="Additional responsibilities"
                  >
                    {hiddenBullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        variants={extraBulletItemVariants}
                        className="flex gap-3 text-sm text-[#A1A1AA] leading-relaxed mt-2.5"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#22D3EE]"
                          aria-hidden="true"
                        />
                        {bullet}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowMore((v) => !v)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] hover:text-[#22D3EE] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
                aria-expanded={showMore}
                aria-controls="extra-bullets"
              >
                <motion.span
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  ▾
                </motion.span>
                {showMore ? "Show less" : `Show ${hiddenBullets.length} more`}
              </button>
            </>
          )}

          {/* Impact row */}
          <ImpactRow summary={item.impactSummary} />
        </motion.article>
      </div>
    </li>
  );
}

// ─── Experience section ────────────────────────────────────────────────────────

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["5%", "90%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative overflow-x-clip overflow-y-visible py-20 md:py-32 border-t border-[rgba(255,255,255,0.08)] bg-[#09090B]"
    >
      {/* Scroll-linked ambient vertical gradient that travels down the timeline */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] h-[400px] rounded-full"
            style={{
              top: glowY,
              opacity: glowOpacity,
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, #8B5CF6 0%, rgba(34,211,238,0.25) 50%, transparent 75%)",
              filter: "blur(110px)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            label="03 / Experience"
            title="Work Experience"
            id="experience-heading"
          />
        </motion.div>

        {/* Timeline container */}
        <div className="mt-16 relative">
          {/* ── Desktop center line (SVG animated) ── */}
          <TimelineLine containerRef={sectionRef} />

          {/* ── Mobile left line ── */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.08)]"
            aria-hidden="true"
          />

          <ol
            className="relative space-y-0"
            role="list"
            aria-label="Work experience timeline"
          >
            {experience.map((item, idx) => (
              <ExperienceCard key={item.id} item={item} index={idx} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
