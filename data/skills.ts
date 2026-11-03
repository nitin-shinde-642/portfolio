export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend Development",
    skills: [
      "PHP",
      "Laravel",
      "REST API Development",
      "Object-Oriented Programming",
      "MVC Architecture",
      "MySQL",
      "MongoDB",
      "JSON",
      "API Integrations",
    ],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "jQuery",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    id: "cms",
    label: "CMS & E-commerce",
    skills: [
      "WordPress",
      "WooCommerce",
      "WooCommerce Subscriptions",
      "Custom Plugin Development",
      "Custom Themes & Child Themes",
      "Advanced Custom Fields (ACF)",
      "Elementor",
      "Divi",
      "Dokan Multi-Vendor",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Dev Tools",
    skills: [
      "AWS EC2",
      "AWS S3",
      "Linux",
      "Git",
      "GitHub",
      "Composer",
      "npm",
      "Apache",
      "cPanel",
    ],
  },
  {
    id: "integrations",
    label: "Integrations & Services",
    skills: [
      "Stripe",
      "Razorpay",
      "Xendit",
      "Twilio",
      "Calendly",
      "Google Calendar API",
      "CleverBridge",
      "Eloqua",
      "Third-party REST APIs",
    ],
  },
];
