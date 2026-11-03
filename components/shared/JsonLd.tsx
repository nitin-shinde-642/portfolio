import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: `${profile.name} — ${profile.title} with ${profile.yearsOfExperience} years of professional software development experience.`,
    url: profile.siteUrl,
    sameAs: [socials.linkedin, socials.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Savitribai Phule Pune University",
    },
    knowsAbout: [
      "PHP",
      "Laravel",
      "WordPress",
      "WooCommerce",
      "REST API Development",
      "React",
      "Next.js",
      "TypeScript",
      "MySQL",
      "AWS",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
