import Link from "next/link";
import { MapPin, Download, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const marqueeTechs = [
  "PHP 8+",
  "Laravel",
  "WordPress",
  "WooCommerce",
  "REST APIs",
  "MySQL",
  "TypeScript",
  "React",
  "Next.js",
  "Stripe",
  "AWS EC2",
  "Tailwind CSS",
  "ACF Pro",
  "Dokan",
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-svh flex flex-col justify-center pt-16 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          {/* Status chip */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--availability)]/30 bg-[color:var(--availability)]/10 px-3 py-1.5 mb-8"
            role="status"
            aria-label="Availability status"
          >
            <span
              className="h-2 w-2 rounded-full bg-[color:var(--availability)] animate-pulse"
              aria-hidden="true"
            />
            <span className="font-mono text-xs font-medium text-[color:var(--availability)]">
              {profile.status}
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-[color:var(--text)] sm:text-5xl lg:text-6xl leading-tight"
          >
            {profile.heroHeading}
          </h1>

          {/* Sub title */}
          <p className="mt-4 font-mono text-sm font-medium text-[color:var(--accent)]">
            {profile.title}
          </p>

          {/* Intro */}
          <p className="mt-6 text-[color:var(--muted)] leading-relaxed max-w-2xl text-base sm:text-lg">
            {profile.heroIntro}
          </p>

          {/* Location */}
          <p className="mt-4 flex items-center gap-1.5 text-sm text-[color:var(--muted)] font-mono">
            <MapPin className="h-3.5 w-3.5 text-[color:var(--accent)]" aria-hidden="true" />
            {profile.location}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[color:var(--accent)] text-white font-medium text-sm hover:bg-[color:var(--accent-hover)] transition-all duration-200 shadow-md shadow-[color:var(--accent)]/20 hover:shadow-lg hover:shadow-[color:var(--accent)]/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              View My Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[color:var(--border)] text-[color:var(--text)] font-medium text-sm hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>

            <Link
              href="#contact"
              className="text-sm font-medium text-[color:var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded ml-1"
            >
              Contact Me →
            </Link>
          </div>

          {/* Stats strip with NumberTicker */}
          <dl className="mt-14 grid grid-cols-3 gap-px border border-[color:var(--border)] rounded-xl overflow-hidden max-w-lg bg-[color:var(--border)] shadow-sm">
            <div className="flex flex-col items-center justify-center py-5 px-4 bg-[color:var(--surface)] text-center">
              <dt className="text-2xl font-bold text-[color:var(--accent)] font-mono flex items-center justify-center">
                <NumberTicker value={4.5} decimalPlaces={1} />
                <span>+</span>
              </dt>
              <dd className="mt-1 text-xs text-[color:var(--muted)] font-mono">
                Years Experience
              </dd>
            </div>

            <div className="flex flex-col items-center justify-center py-5 px-4 bg-[color:var(--surface)] text-center">
              <dt className="text-2xl font-bold text-[color:var(--accent)] font-mono flex items-center justify-center">
                <NumberTicker value={30} />
                <span>+</span>
              </dt>
              <dd className="mt-1 text-xs text-[color:var(--muted)] font-mono">
                Client Projects
              </dd>
            </div>

            <div className="flex flex-col items-center justify-center py-5 px-4 bg-[color:var(--surface)] text-center">
              <dt className="text-2xl font-bold text-[color:var(--accent)] font-mono flex items-center justify-center">
                <NumberTicker value={10} />
                <span>+</span>
              </dt>
              <dd className="mt-1 text-xs text-[color:var(--muted)] font-mono">
                Apps Maintained
              </dd>
            </div>
          </dl>
        </div>

        {/* Marquee Tech Banner */}
        <div className="mt-16 pt-8 border-t border-[color:var(--border)]/60 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)] mb-3">
            Core Technologies &amp; Ecosystem
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <Marquee pauseOnHover className="[--duration:30s] py-1">
              {marqueeTechs.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)] hover:text-[color:var(--text)] hover:border-[color:var(--accent)]/50 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.12}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "stroke-[color:var(--border)] fill-[color:var(--accent)] text-[color:var(--accent)] opacity-60 z-0"
        )}
      />
    </section>
  );
}
