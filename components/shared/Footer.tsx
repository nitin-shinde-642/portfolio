import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[color:var(--border)] bg-[color:var(--surface)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-[color:var(--muted)] font-mono">
          &copy; {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            aria-label="Send email"
            className="text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          {/* Back to top */}
          <Link
            href="#home"
            aria-label="Back to top"
            className="ml-2 flex items-center justify-center w-8 h-8 rounded-lg border border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/50 transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
