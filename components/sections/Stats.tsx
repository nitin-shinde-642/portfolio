"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { stats } from "@/lib/data";
import { EASE, viewportConfig } from "@/lib/motion";

interface StatCardProps {
  numericValue: number;
  suffix: string;
  decimalPlaces?: number;
  label: string;
  delay?: number;
}

function StatCard({ numericValue, suffix, decimalPlaces = 0, label, delay = 0 }: StatCardProps) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="relative group overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#111114] p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
    >
      {/* Cursor tracking hover radial glow */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle top inner gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk flex items-baseline justify-center">
          <NumberTicker
            value={numericValue}
            decimalPlaces={decimalPlaces}
            className="tracking-tight"
          />
          <span className="text-[#8B5CF6] ml-0.5">{suffix}</span>
        </div>
        <p className="mt-2 text-sm md:text-base font-medium text-[#A1A1AA] tracking-wide">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="Key Statistics"
      className="relative z-10 w-full border-y border-white/[0.08] bg-[#09090B]/60 backdrop-blur-sm py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => {
            const hasDecimals = item.value % 1 !== 0;
            return (
              <StatCard
                key={item.label}
                numericValue={item.value}
                suffix={item.suffix}
                decimalPlaces={hasDecimals ? 1 : 0}
                label={item.label}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
