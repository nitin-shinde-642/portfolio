import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { experience } from "@/data/experience";
import { Calendar, MapPin, Award } from "lucide-react";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 sm:py-28 border-t border-[color:var(--border)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Experience"
            title="Work Experience"
            id="experience-heading"
          />
        </Reveal>

        <div className="mt-12">
          <ol className="relative border-l border-[color:var(--border)] ml-4 space-y-12" role="list">
            {experience.map((item, idx) => (
              <li key={item.id} className="ml-8">
                {/* Animated timeline dot */}
                <span
                  className="absolute -left-[9px] mt-1.5 flex h-4 w-4 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="absolute h-full w-full rounded-full bg-[color:var(--accent)]/40 animate-ping opacity-75" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-[color:var(--accent)] bg-[color:var(--surface)]" />
                </span>

                <Reveal delay={idx * 100}>
                  <article>
                    {/* Date range */}
                    <p className="flex items-center gap-1.5 font-mono text-xs text-[color:var(--muted)] mb-3">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <time dateTime="2021-12">{item.startDate}</time>
                      <span aria-hidden="true">–</span>
                      <time dateTime="2026-06">{item.endDate}</time>
                    </p>

                    {/* Role + Company */}
                    <h3 className="text-xl font-bold text-[color:var(--text)]">
                      {item.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[color:var(--accent)] font-medium">
                      {item.company}
                      <span
                        aria-hidden="true"
                        className="text-[color:var(--border)]"
                      >
                        ·
                      </span>
                      <span className="flex items-center gap-1 text-[color:var(--muted)]">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {item.location}
                      </span>
                    </p>

                    {/* Bullets */}
                    <ul className="mt-5 space-y-2" role="list">
                      {item.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 text-sm text-[color:var(--muted)] leading-relaxed"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--accent)]"
                            aria-hidden="true"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Impact summary */}
                    <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-[color:var(--availability)]/20 bg-[color:var(--availability)]/5">
                      <Award
                        className="h-4 w-4 text-[color:var(--availability)] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-[color:var(--text)] leading-relaxed">
                        {item.impactSummary}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
