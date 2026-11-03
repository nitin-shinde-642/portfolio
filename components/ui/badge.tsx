import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "featured";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-mono transition-colors",
        {
          "bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20":
            variant === "default",
          "border border-[color:var(--border)] text-[color:var(--muted)] bg-transparent":
            variant === "outline",
          "bg-[color:var(--accent)] text-white border-0": variant === "featured",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
