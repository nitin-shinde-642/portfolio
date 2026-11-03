import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:pointer-events-none disabled:opacity-50",
        // Size
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-5 text-sm": size === "default",
          "h-12 px-6 text-base": size === "lg",
        },
        // Variant
        {
          "bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] shadow-sm":
            variant === "default",
          "border border-[color:var(--border)] bg-transparent text-[color:var(--text)] hover:bg-[color:var(--surface)] hover:border-[color:var(--accent)]/50":
            variant === "outline",
          "bg-transparent text-[color:var(--text)] hover:bg-[color:var(--surface)]":
            variant === "ghost",
          "bg-transparent text-[color:var(--accent)] hover:underline p-0 h-auto":
            variant === "link",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
