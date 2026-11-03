import { ExternalLink, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col h-full rounded-xl border bg-[color:var(--surface)] p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-[color:var(--accent)]/5",
        project.featured
          ? "border-[color:var(--accent)]/35 hover:border-[color:var(--accent)] shadow-sm"
          : "border-[color:var(--border)] hover:border-[color:var(--accent)]/50"
      )}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[color:var(--accent)] text-white shadow-sm">
            <Star className="h-2.5 w-2.5" aria-hidden="true" />
            Featured
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-base font-semibold text-[color:var(--text)] leading-snug pr-16 group-hover:text-[color:var(--accent)] transition-colors">
        {project.title}
      </h3>

      {/* One-line outcome */}
      <p className="mt-2 text-sm text-[color:var(--accent)] font-medium leading-relaxed">
        {project.outcome}
      </p>

      {/* Bullets */}
      <ul className="mt-4 space-y-2 flex-1" role="list">
        {project.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm text-[color:var(--muted)] leading-relaxed"
          >
            <span
              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[color:var(--accent)]"
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <ul
        className="mt-5 flex flex-wrap gap-1.5"
        role="list"
        aria-label="Technologies used"
      >
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </ul>

      {/* Links */}
      {(project.demoUrl || project.sourceUrl) && (
        <div className="mt-4 pt-4 border-t border-[color:var(--border)] flex items-center gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded"
              aria-label={`View source code of ${project.title} on GitHub`}
            >
              <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
