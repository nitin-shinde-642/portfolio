import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { skillGroups } from "@/data/skills";
import { Server, ShoppingCart, Code2, Layers, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const groupConfig: Record<
  string,
  {
    icon: React.ElementType;
    description: string;
    span: string;
    featured?: boolean;
  }
> = {
  backend: {
    icon: Server,
    description: "Robust architectures, REST APIs, and database engineering.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    featured: true,
  },
  cms: {
    icon: ShoppingCart,
    description: "Custom WordPress plugins, themes, and WooCommerce subscriptions.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  integrations: {
    icon: Layers,
    description: "Payment gateways, CRMs, calendars, and third-party APIs.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  frontend: {
    icon: Code2,
    description: "Responsive user interfaces, TypeScript, and modern UI frameworks.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  cloud: {
    icon: Cloud,
    description: "Linux production servers, AWS infrastructure, and build tools.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 sm:py-28 border-t border-[color:var(--border)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Skills"
            title="Technical Skills"
            description="Languages, frameworks, tools and services I work with regularly to build reliable web software."
            id="skills-heading"
          />
        </Reveal>

        <div className="mt-12">
          <BentoGrid>
            {skillGroups.map((group, i) => {
              const config = groupConfig[group.id] || {
                icon: Server,
                description: "",
                span: "col-span-1",
              };
              const Icon = config.icon;

              return (
                <Reveal
                  key={group.id}
                  delay={i * 60}
                  className={config.span}
                >
                  <BentoCard
                    name={group.label}
                    description={config.description}
                    Icon={Icon}
                    className="h-full"
                  >
                    <ul className="flex flex-wrap gap-2 pt-2" role="list">
                      {group.skills.map((skill) => (
                        <li key={skill}>
                          <span
                            className={cn(
                              "inline-block font-mono text-xs px-2.5 py-1 rounded-md",
                              "border border-[color:var(--border)] text-[color:var(--muted)] bg-[color:var(--background)]/60",
                              "hover:border-[color:var(--accent)]/50 hover:text-[color:var(--text)] hover:bg-[color:var(--accent)]/10 hover:shadow-sm transition-all duration-200 cursor-default"
                            )}
                          >
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </BentoCard>
                </Reveal>
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
