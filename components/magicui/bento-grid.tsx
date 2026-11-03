import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description?: string;
  children?: ReactNode;
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  children,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-all duration-300",
      "hover:border-[color:var(--accent)]/50 hover:shadow-xl hover:shadow-[color:var(--accent)]/5 hover:-translate-y-1",
      className
    )}
    {...props}
  >
    {background && (
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {background}
      </div>
    )}

    <div className="relative z-10 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/40 transition-colors flex-shrink-0">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
          <div>
            <h3 className="text-base font-semibold text-[color:var(--text)]">
              {name}
            </h3>
            {description && (
              <p className="text-xs text-[color:var(--muted)]">{description}</p>
            )}
          </div>
        </div>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>

    {/* Ambient hover light */}
    <div
      className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 140, 255, 0.06), transparent 80%)",
      }}
    />
  </div>
);
