"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  className?: string;
}

/**
 * Reusable chip / pill component for skill tags.
 * Small pill with mono font, border, and surface background.
 * On hover: border shifts to violet, text brightens.
 */
export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        // Base shape & spacing
        "inline-block font-mono text-xs px-2.5 py-1 rounded-full cursor-default select-none",
        // Surface + border with clear contrast on #111114
        "bg-white/[0.04] border border-white/[0.12] text-[#D4D4D8]",
        // Hover: border → violet, text → near-white
        "transition-all duration-200",
        "hover:border-[#8B5CF6]/60 hover:text-[#FAFAFA] hover:bg-[#8B5CF6]/15 hover:scale-105",
        className
      )}
    >
      {label}
    </span>
  );
}
