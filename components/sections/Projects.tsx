import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-28 border-t border-[color:var(--border)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Projects"
            title="Selected Work"
            description="A selection of projects built across e-commerce, integrations, and full-stack development."
            id="projects-heading"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 50, 200)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
