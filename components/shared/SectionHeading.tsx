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
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#8B5CF6] mb-3">
          {label}
        </p>
      )}
      <h2
        id={id}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm md:text-base text-[#A1A1AA] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
