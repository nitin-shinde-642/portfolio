"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type RefObject,
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { projects, type Project } from "@/lib/data";
import { EASE, viewportConfig } from "@/lib/motion";

// ─── Flow Diagram Component ──────────────────────────────────────────────────

interface FlowDiagramProps {
  project: Project;
  animate: boolean;
}

function FlowDiagram({ project, animate }: FlowDiagramProps) {
  return (
    <div
      className="w-full my-3 py-1.5 overflow-x-auto no-scrollbar scroll-smooth"
      aria-label="Workflow pipeline architecture"
    >
      <div className="flex items-center gap-2 min-w-max pb-1">
        {project.flowNodes.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: EASE }}
              className="group/node relative flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(17,17,20,0.9)] backdrop-blur-md shadow-sm transition-all duration-200 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shrink-0" />
              <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#FAFAFA] tracking-wide whitespace-nowrap">
                {label}
              </span>
            </motion.div>

            {i < project.flowNodes.length - 1 && (
              <div className="flex items-center justify-center text-[#22D3EE]/70 shrink-0 px-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
  className?: string;
}

function ProjectCard({ project, style, className }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      data-project-card=""
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.15, ease: "linear" }}
      className={`relative flex flex-col bg-[#111114] rounded-[20px] border border-[rgba(255,255,255,0.08)] p-8 h-full overflow-hidden group ${className ?? ""}`}
    >
      {/* Light reflection on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.08), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Card number */}
      <p
        className="font-mono text-5xl font-bold text-[rgba(255,255,255,0.06)] leading-none mb-4 select-none"
        aria-hidden="true"
      >
        {project.number}
      </p>

      {/* Featured badge */}
      {project.featured && (
        <span
          className="inline-flex w-fit mb-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: "linear-gradient(#111114, #111114) padding-box, linear-gradient(90deg, #8B5CF6, #22D3EE) border-box",
            border: "1px solid transparent",
            color: "#8B5CF6",
          }}
          aria-label="Featured project"
        >
          Featured
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-[#FAFAFA] leading-tight mb-3 font-['Space_Grotesk',sans-serif]">
        {project.title}
      </h3>

      {/* Architecture pipeline */}
      <div className="mb-4">
        <FlowDiagram project={project} animate={isInView} />
      </div>

      {/* Summary */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
        {project.summary}
      </p>

      {/* Bullets */}
      <ul className="space-y-2 mb-5 flex-1" role="list">
        {project.bullets.map((bullet, bi) => (
          <motion.li
            key={bi}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: 0.2 + bi * 0.08, ease: EASE }}
            className="flex gap-2.5 text-sm text-[#A1A1AA] leading-relaxed"
          >
            <span
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]"
              aria-hidden="true"
            />
            {bullet}
          </motion.li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
        {project.tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── GSAP horizontal scroll (desktop only) ────────────────────────────────────

interface HorizontalScrollProps {
  children: React.ReactNode;
  cardCount: number;
}

function HorizontalScroll({ children, cardCount }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initGSAP() {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const container = containerRef.current;

        ctx = gsap.context(() => {
          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.round(self.progress * (cardCount - 1));
                setActiveIndex(Math.min(idx, cardCount - 1));
              },
            },
          });
        }, containerRef);
      } catch (err) {
        console.warn("GSAP init failed:", err);
      }
    }

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, [cardCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ["20%", "85%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["35%", "65%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.28, 0.18]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${Math.max(220, cardCount * 55)}vh` }}
      className="relative w-full"
    >
      {/* Native CSS sticky container — pins 100% reliably at top: 0 without DOM injection */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 bg-[#09090B] z-20">
        {/* Scroll-driven gradient background behind projects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute w-[750px] max-w-[90vw] h-[750px] max-h-[90vh] rounded-full"
            style={{
              left: glowX,
              top: glowY,
              x: "-50%",
              y: "-50%",
              opacity: glowOpacity,
              background:
                "radial-gradient(circle, #8B5CF6 0%, rgba(34,211,238,0.4) 45%, transparent 70%)",
              filter: "blur(130px)",
            }}
          />
        </div>

        {/* Progress counter */}
        <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-4 pb-2 flex-shrink-0 max-w-[1400px] w-full mx-auto">
          <SectionHeading
            label="04 / Projects"
            title="Selected Work"
            id="projects-heading"
          />
          <p
            className="font-mono text-sm text-[#A1A1AA] tabular-nums"
            aria-live="polite"
            aria-label={`Viewing project ${activeIndex + 1} of ${cardCount}`}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-bold text-base"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[rgba(255,255,255,0.2)]"> / {String(cardCount).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Cards track */}
        <div className="flex-1 overflow-visible flex items-center px-8 md:px-16 my-auto">
          <div
            ref={trackRef}
            className="flex gap-8 will-change-transform items-stretch"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile / reduced-motion stack ────────────────────────────────────────────

function VerticalStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["10%", "85%"]);

  return (
    <div ref={stackRef} className="relative overflow-hidden">
      {/* Scroll-driven ambient gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[550px] max-w-[90vw] h-[550px] rounded-full"
          style={{
            top: glowY,
            background:
              "radial-gradient(circle, #8B5CF6 0%, rgba(34,211,238,0.35) 50%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.2,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-10"
      >
        <SectionHeading
          label="04 / Projects"
          title="Selected Work"
          id="projects-heading"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.3), ease: EASE }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop horizontal cards ──────────────────────────────────────────────────

function DesktopHorizontalCards() {
  return (
    <HorizontalScroll cardCount={projects.length}>
      {projects.map((project) => (
        <div
          key={project.id}
          data-card
          data-project-card
          style={{ width: "640px", maxWidth: "70vw", flexShrink: 0 }}
          className="h-[520px] max-h-[70vh]"
        >
          <ProjectCard project={project} className="h-full" />
        </div>
      ))}
    </HorizontalScroll>
  );
}

// ─── Projects section ──────────────────────────────────────────────────────────

export function Projects() {
  const [shouldUseVertical, setShouldUseVertical] = useState(false);

  useEffect(() => {
    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldUseVertical(!isLg || prefersReduced);
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-[rgba(255,255,255,0.08)] bg-[#09090B]"
    >
      {/* Desktop: pinned horizontal scroll */}
      <div className="hidden lg:block">
        {shouldUseVertical ? (
          <div className="mx-auto max-w-[1200px] px-6 md:px-12 py-20 md:py-32">
            <VerticalStack />
          </div>
        ) : (
          <DesktopHorizontalCards />
        )}
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="lg:hidden mx-auto max-w-[1200px] px-6 py-16">
        <VerticalStack />
      </div>
    </section>
  );
}
