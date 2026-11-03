import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: socials.email,
    href: `mailto:${socials.email}`,
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: socials.phone,
    href: `tel:${socials.phone}`,
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/nitin642",
    href: socials.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/nitin-shinde-642",
    href: socials.github,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 border-t border-[color:var(--border)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Contact"
            title="Let's Build Something Useful"
            description="Open to full-time software development roles in Pune, Pimpri-Chinchwad, or remote positions within India. Feel free to reach out."
            id="contact-heading"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — links */}
          <Reveal className="space-y-6" delay={80}>
            {/* Contact links */}
            <div className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-4 group"
                  aria-label={`${label}: ${value}`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)] group-hover:border-[color:var(--accent)]/50 group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[color:var(--muted)]">{label}</p>
                    <p className="text-sm font-medium text-[color:var(--text)] group-hover:text-[color:var(--accent)] transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume download */}
            <div className="pt-4 border-t border-[color:var(--border)]">
              <p className="text-sm text-[color:var(--muted)] mb-3">
                Prefer to review my experience offline?
              </p>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[color:var(--border)] text-sm font-medium text-[color:var(--text)] hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                aria-label="Download resume as PDF"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume (PDF)
              </a>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={120}>
            <div className="p-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
              <h3 className="text-sm font-mono font-medium text-[color:var(--accent)] uppercase tracking-widest mb-5">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
