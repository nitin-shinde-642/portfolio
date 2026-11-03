"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="w-9 h-9 inline-block" aria-hidden="true" />;
  }

  return (
    <AnimatedThemeToggler
      theme={resolvedTheme as "light" | "dark"}
      onThemeChange={(newTheme) => setTheme(newTheme)}
      variant="circle"
      duration={450}
      className="flex items-center justify-center w-9 h-9 rounded-lg text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] [&>svg]:h-4 [&>svg]:w-4"
    />
  );
}
