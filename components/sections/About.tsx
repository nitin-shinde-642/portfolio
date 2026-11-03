import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Card } from "@/components/ui/card";
import { MapPin, GraduationCap, Languages, Award } from "lucide-react";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 border-t border-[color:var(--border)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="About"
            title="A bit about me"
            id="about-heading"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Text column */}
          <div className="lg:col-span-3 space-y-5">
            {profile.aboutSummaryParagraphs.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-[color:var(--muted)] leading-relaxed">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Facts card */}
          <Reveal className="lg:col-span-2" delay={100}>
            <Card className="h-full border-[color:var(--accent)]/30 hover:border-[color:var(--accent)]/50 transition-colors">
              <h3 className="text-sm font-mono font-medium text-[color:var(--accent)] uppercase tracking-widest mb-6">
                Quick Facts
              </h3>
              <dl className="space-y-5">
                <div className="flex gap-3">
                  <dt className="flex-shrink-0">
                    <MapPin
                      className="h-4 w-4 text-[color:var(--accent)] mt-0.5"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm text-[color:var(--text)]">
                    <span className="sr-only">Location: </span>
                    {profile.facts.location}
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="flex-shrink-0">
                    <GraduationCap
                      className="h-4 w-4 text-[color:var(--accent)] mt-0.5"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm text-[color:var(--text)]">
                    <span className="sr-only">Education: </span>
                    {profile.facts.education}
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="flex-shrink-0">
                    <Languages
                      className="h-4 w-4 text-[color:var(--accent)] mt-0.5"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm text-[color:var(--text)]">
                    <span className="sr-only">Languages: </span>
                    {profile.facts.languages.join(" · ")}
                  </dd>
                </div>

                <div className="flex gap-3">
                  <dt className="flex-shrink-0">
                    <Award
                      className="h-4 w-4 text-[color:var(--accent)] mt-0.5"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm text-[color:var(--text)]">
                    <span className="sr-only">Award: </span>
                    {profile.facts.award}
                  </dd>
                </div>
              </dl>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
