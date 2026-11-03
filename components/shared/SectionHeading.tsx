import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {label && (
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[color:var(--accent)] mb-3">
          {label}
        </p>
      )}
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight text-[color:var(--text)] sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
