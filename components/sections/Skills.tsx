"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "motion/react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { skillCategories, type SkillCategory } from "@/lib/data";
import { EASE, viewportConfig } from "@/lib/motion";

// ─── Animation variants ────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
      delay: i * 0.1,
    },
  }),
};

const chipContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.15,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE },
  },
};

// ─── Category descriptions ─────────────────────────────────────────────────────

const descriptions: Record<string, string> = {
  backend: "Robust architectures, REST APIs, and database engineering.",
  frontend: "Responsive user interfaces, TypeScript, and modern UI frameworks.",
  cms: "Custom WordPress plugins, themes, and WooCommerce subscriptions.",
  cloud: "Linux production servers, AWS infrastructure, and build tools.",
  integrations: "Payment gateways, CRMs, calendars, and third-party APIs.",
};

// ─── SkillCard ─────────────────────────────────────────────────────────────────

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...viewportConfig, once: true });

  const description = category.description ?? descriptions[category.id] ?? "";

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE } }}
      className={cn(
        // Grid span from data
        category.span,
        // Card surface
        "bg-[#111114] rounded-[20px] border border-[rgba(255,255,255,0.08)] p-6 md:p-8",
        "flex flex-col gap-5",
        // Subtle hover glow
        "transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]"
      )}
    >
      {/* Title */}
      <div>
        <h3
          className="font-['Space_Grotesk',sans-serif] font-medium text-[#FAFAFA] text-lg leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
        >
          {category.label}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[#A1A1AA] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Chips */}
      <motion.ul
        variants={chipContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-2"
        role="list"
        aria-label={`${category.label} skills`}
      >
        {category.skills.map((skill) => (
          <motion.li key={skill} variants={chipVariants}>
            <Chip label={skill} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

// Inline cn since we need it without extra import
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Skills section ────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 md:py-32 border-t border-[rgba(255,255,255,0.08)] bg-[#09090B]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section heading with fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            label="02 / Skills"
            title="Technical Skills"
            id="skills-heading"
          />
        </motion.div>

        {/* Bento grid — 3 cols desktop, 1 col mobile */}
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Skill categories"
        >
          <AnimatePresence>
            {skillCategories.map((category, i) => (
              <SkillCard key={category.id} category={category} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
