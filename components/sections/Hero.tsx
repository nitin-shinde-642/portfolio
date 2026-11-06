"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { profile } from "@/data/profile";
import { EASE, wordReveal, staggerContainer, viewportConfig } from "@/lib/motion";

/* ─── Design tokens ──────────────────────────────────────── */
const ACCENT_GRADIENT = "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)";
const GRADIENT_TEXT   = "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent";

/* ─── Typewriter hook ────────────────────────────────────── */
const TYPEWRITER_ITEMS = [
  "Laravel & WordPress Specialist",
  "WooCommerce Expert",
  "REST API Developer",
] as const;

function useTypewriter(items: readonly string[], charDelay = 55, pause = 1800, eraseDelay = 30) {
  const [displayed, setDisplayed] = useState("");
  const [itemIdx,   setItemIdx]   = useState(0);
  const [phase,     setPhase]     = useState<"typing" | "waiting" | "erasing">("typing");
  const charIdx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      const target = items[itemIdx];
      if (charIdx.current < target.length) {
        timer = setTimeout(() => {
          setDisplayed(target.slice(0, charIdx.current + 1));
          charIdx.current++;
        }, charDelay);
      } else {
        timer = setTimeout(() => setPhase("waiting"), pause);
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => setPhase("erasing"), 200);
    } else {
      if (charIdx.current > 0) {
        timer = setTimeout(() => {
          charIdx.current--;
          setDisplayed((d) => d.slice(0, -1));
        }, eraseDelay);
      } else {
        setItemIdx((i) => (i + 1) % items.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, displayed, itemIdx, items, charDelay, pause, eraseDelay]);

  return displayed;
}

/* ─── Magnetic button hook ───────────────────────────────── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 80;
    if (dist < radius) {
      setTranslate({ x: dx * strength, y: dy * strength });
    } else {
      setTranslate({ x: 0, y: 0 });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => setTranslate({ x: 0, y: 0 }), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, translate };
}

/* ─── PHP code snippet ───────────────────────────────────── */
const PHP_CODE = `<?php

class SubscriptionService
{
    public function renew(int $id): Response
    {
        $sub = Subscription::find($id);
        return $this->gateway->charge($sub);
    }
}`;

function CodeWindow({ prefersReduced }: { prefersReduced: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const charRef = useRef(0);

  /* Type-out effect */
  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(PHP_CODE);
      return;
    }
    const type = () => {
      if (charRef.current < PHP_CODE.length) {
        charRef.current++;
        setDisplayed(PHP_CODE.slice(0, charRef.current));
        const delay = PHP_CODE[charRef.current - 1] === "\n" ? 80 : 35;
        setTimeout(type, delay);
      }
    };
    const t = setTimeout(type, 600);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  /* Blink cursor */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  /* Color-coded PHP syntax highlighting (minimal) */
  const renderCode = (code: string) => {
    const lines = code.split("\n");
    return lines.map((line, lineIdx) => {
      const parts: React.ReactNode[] = [];
      let remaining = line;
      let key = 0;

      const pushColored = (text: string, color: string) => {
        parts.push(<span key={key++} style={{ color }}>{text}</span>);
      };

      // keyword highlight
      const keywords = ["class", "public", "function", "return", "int"];
      let matched = false;
      for (const kw of keywords) {
        const regex = new RegExp(`(^|\\s)(${kw})(\\s|$|\\()`);
        if (regex.test(remaining)) {
          const idx = remaining.indexOf(kw);
          if (idx >= 0) {
            if (idx > 0) pushColored(remaining.slice(0, idx), "#A1A1AA");
            pushColored(kw, "#C084FC");
            remaining = remaining.slice(idx + kw.length);
            matched = true;
            break;
          }
        }
      }

      // string / variable coloring
      if (!matched) {
        if (remaining.includes("<?php")) {
          pushColored("<?php", "#F59E0B");
          remaining = remaining.slice(5);
        } else if (remaining.trim().startsWith("//")) {
          pushColored(remaining, "#52525B");
          remaining = "";
        } else if (remaining.includes("$")) {
          const idx = remaining.indexOf("$");
          if (idx > 0) pushColored(remaining.slice(0, idx), "#A1A1AA");
          pushColored(remaining.slice(idx, remaining.indexOf(" ", idx) > -1 ? remaining.indexOf(" ", idx) : remaining.length), "#34D399");
          remaining = remaining.indexOf(" ", idx) > -1 ? remaining.slice(remaining.indexOf(" ", idx)) : "";
        }
      }

      if (remaining) pushColored(remaining, "#A1A1AA");

      return (
        <div key={lineIdx} className="leading-6">
          {parts}
          {lineIdx === lines.length - 1 && (
            <span
              className="inline-block w-[2px] h-[14px] bg-[#8B5CF6] ml-[1px] align-middle"
              style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
              aria-hidden="true"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div
      className="rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden w-full max-w-full"
      style={{
        background: "rgba(17,17,20,0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      aria-label="PHP code sample"
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] min-w-0">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] shrink-0" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] shrink-0" aria-hidden="true" />
        <span className="ml-auto font-mono text-xs text-[#52525B] truncate pl-2">SubscriptionService.php</span>
      </div>

      {/* Code */}
      <div className="p-5 font-mono text-[13px] text-[#A1A1AA] overflow-x-auto min-h-[200px]">
        {renderCode(displayed)}
      </div>
    </div>
  );
}

/* ─── Floating tech chip ─────────────────────────────────── */
function FloatingChip({
  label,
  delay,
  x,
  prefersReduced,
}: {
  label: string;
  delay: number;
  x: string;
  prefersReduced: boolean;
}) {
  const amplitude = prefersReduced ? 0 : 8;
  return (
    <motion.div
      className="absolute font-mono text-xs px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] pointer-events-none"
      style={{
        background: "rgba(17,17,20,0.9)",
        left: x,
        top: "0",
        backdropFilter: "blur(8px)",
      }}
      animate={
        prefersReduced
          ? {}
          : {
              y: [0, -amplitude, 0, amplitude, 0],
            }
      }
      transition={{
        repeat: Infinity,
        duration: 4 + delay * 0.5,
        ease: "easeInOut",
        delay,
      }}
    >
      {label}
    </motion.div>
  );
}

/* ─── Word split animation ───────────────────────────────── */
const HEADING = "Building Reliable, Scalable, and Efficient Web Applications.";
const GRADIENT_WORDS = new Set(["Reliable,", "Scalable,", "Efficient"]);

function AnimatedHeading({ prefersReduced }: { prefersReduced: boolean }) {
  const words = HEADING.split(" ");

  return (
    <motion.h1
      id="hero-heading"
      className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] leading-[1.15] font-space-grotesk break-words max-w-full"
      variants={prefersReduced ? {} : staggerContainer}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06 }}
    >
      {words.map((word, i) => {
        const isGradient = GRADIENT_WORDS.has(word);
        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
          >
            <motion.span
              className={`inline-block ${isGradient ? GRADIENT_TEXT : ""}`}
              variants={prefersReduced ? {} : wordReveal}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}

/* ─── Scroll indicator ───────────────────────────────────── */
function ScrollIndicator({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <motion.div
      className="hidden xl:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#52525B]">Scroll</span>
      <div className="w-[1px] h-10 bg-[rgba(255,255,255,0.08)] relative overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ background: ACCENT_GRADIENT, height: "40%" }}
          animate={prefersReduced ? {} : { y: ["0%", "250%"] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Hero section ───────────────────────────────────────── */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const typewriterText = useTypewriter(TYPEWRITER_ITEMS);
  const sectionRef   = useRef<HTMLElement>(null);

  /* Parallax via scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawCodeY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rawGlowY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  const codeY = useSpring(rawCodeY, { stiffness: 80, damping: 20 });
  const glowY = useSpring(rawGlowY, { stiffness: 80, damping: 20 });

  /* Magnetic buttons */
  const { ref: btn1Ref, translate: t1 } = useMagnetic();
  const { ref: btn2Ref, translate: t2 } = useMagnetic();
  const { ref: btn3Ref, translate: t3 } = useMagnetic();

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-svh flex flex-col justify-center pt-24 pb-16 overflow-x-clip overflow-y-visible bg-[#09090B] w-full max-w-full"
    >
      {/* Background radial glow with scroll-driven parallax and scale */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ y: prefersReduced ? 0 : glowY, scale: prefersReduced ? 1 : glowScale, opacity: glowOpacity }}
      >
        <div
          className="absolute -top-32 left-1/4 w-[650px] max-w-[90vw] h-[650px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, rgba(139,92,246,0.3) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] max-w-[80vw] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, rgba(34,211,238,0.2) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 md:px-12 grid grid-cols-12 gap-8 items-center min-w-0">

        {/* ── Left column (7 cols) ───────────────────────────── */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4 sm:gap-5 min-w-0 max-w-full">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 w-fit rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.08)] px-3 py-1.5"
            role="status"
            aria-label="Availability status"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className="font-mono text-xs font-medium text-[#22C55E]">
              Available for immediate joining
            </span>
          </motion.div>

          {/* Greeting Eyebrow */}
          <motion.div
            className="flex flex-wrap items-center gap-2 font-mono"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="text-sm text-[#A1A1AA]">Hi, I&apos;m</span>
            <span className="text-base sm:text-lg font-bold text-[#FAFAFA] tracking-wide font-space-grotesk">
              Nitin Shinde
            </span>
            <span className="text-[#52525B]" aria-hidden="true">·</span>
            <span className="text-xs sm:text-sm text-[#A1A1AA]">Pune, India</span>
          </motion.div>

          {/* Animated heading */}
          <AnimatedHeading prefersReduced={prefersReduced} />

          {/* Typewriter subtitle */}
          <motion.p
            className="font-mono text-sm text-[#A1A1AA] min-h-[1.5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="text-[#FAFAFA] font-medium">Senior PHP Developer</span>
            {" | "}
            <span className="text-[#8B5CF6]">{typewriterText}</span>
            <span
              className="inline-block w-[2px] h-[13px] bg-[#8B5CF6] ml-0.5 align-middle"
              style={{ animation: "blink 1.05s step-end infinite" }}
              aria-hidden="true"
            />
          </motion.p>

          {/* Paragraph */}
          <motion.p
            className="text-[#A1A1AA] leading-relaxed max-w-xl text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: EASE }}
          >
            4.5 years building web applications, backend systems, REST APIs,
            and custom WordPress solutions.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 max-w-full"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
          >
            {/* View My Projects — magnetic */}
            <motion.a
              ref={btn1Ref as React.RefObject<HTMLAnchorElement>}
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              style={{
                background: ACCENT_GRADIENT,
                boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
                transform: `translate(${t1.x}px, ${t1.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s",
              }}
              whileHover={{ scale: 1.02 }}
            >
              View My Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>

            {/* Download Resume — magnetic */}
            <motion.a
              ref={btn2Ref as React.RefObject<HTMLAnchorElement>}
              href="/Nitin_Shinde.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
              style={{
                background: "linear-gradient(#09090B, #09090B) padding-box, linear-gradient(135deg, #8B5CF6, #22D3EE) border-box",
                border: "1.5px solid transparent",
                transform: `translate(${t2.x}px, ${t2.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.a>

            {/* Contact Me — magnetic text link */}
            <motion.a
              ref={btn3Ref as React.RefObject<HTMLAnchorElement>}
              href="#contact"
              className="text-sm font-medium text-[#8B5CF6] hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
              style={{
                transform: `translate(${t3.x}px, ${t3.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s",
              }}
            >
              Contact Me →
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right column (5 cols) — code window ───────────── */}
        <motion.div
          className="col-span-12 lg:col-span-5 relative min-w-0 max-w-full"
          style={{ y: prefersReduced ? 0 : codeY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        >
          <CodeWindow prefersReduced={prefersReduced} />

          {/* Floating tech chips */}
          {/* Mobile: clean flex wrap */}
          <div className="flex sm:hidden flex-wrap gap-2 mt-4">
            <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] bg-[rgba(17,17,20,0.9)]">
              Laravel
            </span>
            <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] bg-[rgba(17,17,20,0.9)]">
              WooCommerce
            </span>
            <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] bg-[rgba(17,17,20,0.9)]">
              Stripe
            </span>
          </div>

          {/* Desktop: floating chips with parallax */}
          <div className="hidden sm:block relative mt-4 h-10 w-full overflow-visible">
            <FloatingChip label="Laravel"     delay={0}   x="0%"   prefersReduced={prefersReduced} />
            <FloatingChip label="WooCommerce" delay={0.6} x="35%"  prefersReduced={prefersReduced} />
            <FloatingChip label="Stripe"      delay={1.2} x="72%"  prefersReduced={prefersReduced} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator prefersReduced={prefersReduced} />

      {/* Blink keyframe via style tag */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
