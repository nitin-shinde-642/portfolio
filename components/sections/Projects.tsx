"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type RefObject,
} from "react";
import { motion, useInView, type Variants } from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { projects, type Project } from "@/lib/data";
import { EASE, viewportConfig } from "@/lib/motion";

// ─── Diagram types ─────────────────────────────────────────────────────────────

interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface DiagramEdge {
  from: string;
  to: string;
}

interface DiagramSpec {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  width: number;
  height: number;
}

function buildLinearDiagram(labels: string[]): DiagramSpec {
  const nodeW = 90;
  const nodeH = 32;
  const gapX = 48;
  const totalW = labels.length * nodeW + (labels.length - 1) * gapX;
  const cx = 20; // left padding
  const cy = 20;

  const nodes: DiagramNode[] = labels.map((label, i) => ({
    id: `n${i}`,
    label,
    x: cx + i * (nodeW + gapX),
    y: cy,
  }));

  const edges: DiagramEdge[] = labels.slice(0, -1).map((_, i) => ({
    from: `n${i}`,
    to: `n${i + 1}`,
  }));

  return {
    nodes,
    edges,
    width: cx + totalW + 20,
    height: cy + nodeH + 20,
  };
}

function getDiagramSpec(project: Project): DiagramSpec {
  return buildLinearDiagram(project.flowNodes);
}

// ─── SVG Diagram ──────────────────────────────────────────────────────────────

interface SVGDiagramProps {
  project: Project;
  animate: boolean;
}

const NODE_W = 90;
const NODE_H = 32;
const NODE_RX = 8;

function SVGDiagram({ project, animate }: SVGDiagramProps) {
  const spec = getDiagramSpec(project);

  // Build SVG path for edge (horizontal line between node right and next node left)
  function edgePath(fromNode: DiagramNode, toNode: DiagramNode) {
    const x1 = fromNode.x + NODE_W;
    const y1 = fromNode.y + NODE_H / 2;
    const x2 = toNode.x;
    const y2 = toNode.y + NODE_H / 2;
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  }

  const nodeById = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      className="w-full overflow-visible"
      style={{ maxHeight: 72 }}
      aria-hidden="true"
    >
      {/* Edges */}
      {spec.edges.map((edge, ei) => {
        const from = nodeById[edge.from];
        const to = nodeById[edge.to];
        if (!from || !to) return null;
        const d = edgePath(from, to);
        const lineLen = Math.abs(to.x - (from.x + NODE_W)) + 4;

        return (
          <g key={`edge-${ei}`}>
            {/* Track */}
            <path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
            {/* Animated fill */}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#diagramGrad)"
              strokeWidth="1.5"
              strokeDasharray={lineLen}
              strokeDashoffset={lineLen}
              animate={animate ? { strokeDashoffset: 0 } : { strokeDashoffset: lineLen }}
              transition={{ duration: 0.6, delay: 0.2 + ei * 0.15, ease: EASE }}
            />
            {/* Travelling dot */}
            {animate && (
              <motion.circle
                r={3}
                fill="#22D3EE"
                animate={{
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                style={{
                  offsetPath: `path("${d}")`,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + ei * 0.15,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "linear",
                }}
              />
            )}
          </g>
        );
      })}

      {/* Gradient def */}
      <defs>
        <linearGradient id="diagramGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* Nodes */}
      {spec.nodes.map((node, ni) => (
        <g key={node.id}>
          {/* Node background */}
          <motion.rect
            x={node.x}
            y={node.y}
            width={NODE_W}
            height={NODE_H}
            rx={NODE_RX}
            fill="#111114"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, delay: ni * 0.1, ease: EASE }}
            style={{ transformOrigin: `${node.x + NODE_W / 2}px ${node.y + NODE_H / 2}px` }}
          />
          {/* Node label */}
          <motion.text
            x={node.x + NODE_W / 2}
            y={node.y + NODE_H / 2 + 4.5}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-jetbrains-mono, monospace)"
            fill="#A1A1AA"
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + ni * 0.1 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
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

      {/* SVG diagram */}
      <div className="mb-4 py-2">
        <SVGDiagram project={project} animate={isInView} />
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

  return (
    <div
      ref={containerRef}
      style={{ height: `${Math.max(220, cardCount * 55)}vh` }}
      className="relative w-full"
    >
      {/* Native CSS sticky container — pins 100% reliably at top: 0 without DOM injection */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 bg-[#09090B] z-20">
        {/* Progress counter */}
        <div className="flex items-center justify-between px-8 md:px-16 pt-4 pb-2 flex-shrink-0 max-w-[1400px] w-full mx-auto">
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
  return (
    <div>
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
