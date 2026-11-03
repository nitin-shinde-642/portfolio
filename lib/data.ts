// lib/data.ts - Single source of truth for all portfolio content

export const profile = {
  name: "Nitin Shinde",
  title: "Senior PHP Developer | Laravel & WordPress Specialist",
  location: "Pune, Maharashtra, India",
  email: "shindenitin642@gmail.com",
  phone: "+91 76209 14878",
  status: "Available for immediate joining",
  yearsOfExperience: "4.5+",
  projectsDelivered: "30+",
  applicationsMaintained: "10+",
  heroHeading: "Building Reliable, Scalable, and Efficient Web Applications.",
  heroSubtitle:
    "4.5 years building web applications, backend systems, REST APIs, and custom WordPress solutions.",
  typewriterItems: [
    "Laravel & WordPress Specialist",
    "WooCommerce Expert",
    "REST API Developer",
  ],
  siteUrl: "https://nitinshinde.dev",
  resumeUrl: "/Nitin_Shinde.pdf",
  github: "https://github.com/nitin-shinde-642",
  linkedin: "https://www.linkedin.com/in/nitin642/",
  contactAvailability:
    "Open to full-time software development roles in Pune, Pimpri-Chinchwad, or remote positions within India.",
} as const;

export const aboutContent = {
  story: [
    "I approach every project with a focus on clean, maintainable, and reusable code — preferring practical solutions over unnecessary complexity.",
    "Experienced in developing custom plugins, integrating third-party services, building REST APIs, and maintaining production applications.",
    "I build applications with reliability, security, and long-term maintainability in mind.",
  ],
  facts: {
    location: "Pune, Maharashtra, India",
    education:
      "Bachelor of Vocational (Software Development), Savitribai Phule Pune University",
    languages: ["Marathi (Native)", "Hindi (Spoken)", "English (Professional)"],
    award: "Emerging Leader Award — SiGa Systems Pvt. Ltd.",
  },
  built: [
    "E-commerce platforms",
    "Subscription apps",
    "Job boards",
    "Marketing integrations",
    "HRMS systems",
  ],
} as const;

export const stats = [
  { value: 4.5, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Client Projects" },
  { value: 10, suffix: "+", label: "Apps Maintained" },
] as const;

export const marqueeItems = [
  { name: "PHP 8+" },
  { name: "Laravel" },
  { name: "WordPress" },
  { name: "WooCommerce" },
  { name: "REST APIs" },
  { name: "MySQL" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Stripe" },
  { name: "AWS EC2" },
  { name: "Tailwind CSS" },
  { name: "ACF Pro" },
  { name: "Dokan" },
];

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: string[];
  span?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend Development",
    description: "Robust architectures, REST APIs, and database engineering.",
    span: "col-span-1 md:col-span-2",
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
    description:
      "Responsive user interfaces, TypeScript, and modern UI frameworks.",
    span: "col-span-1",
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
    description:
      "Custom WordPress plugins, themes, and WooCommerce subscriptions.",
    span: "col-span-1",
    skills: [
      "WordPress",
      "WooCommerce",
      "WooCommerce Subscriptions",
      "Custom Plugin Development",
      "Custom Themes & Child Themes",
      "ACF",
      "Elementor",
      "Divi",
      "Dokan Multi-Vendor",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Dev Tools",
    description: "Linux production servers, AWS infrastructure, and build tools.",
    span: "col-span-1",
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
    description: "Payment gateways, CRMs, calendars, and third-party APIs.",
    span: "col-span-1",
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

export const experience = [
  {
    id: "siga-systems",
    role: "Senior Software Developer",
    company: "SiGa Systems Pvt. Ltd.",
    location: "Pune, India",
    startDate: "December 2021",
    endDate: "June 2026",
    bullets: [
      "Developed and maintained full-stack web applications using PHP, Laravel, WordPress, and JavaScript.",
      "Designed and implemented REST APIs and backend systems powering multiple client-facing platforms.",
      "Developed custom WordPress plugins, themes, and reusable integration frameworks for marketing and e-commerce clients.",
      "Built and customized WooCommerce functionality including subscription lifecycle management and payment workflows.",
      "Integrated third-party payment gateways (Stripe, Razorpay, Xendit), marketing platforms (Eloqua, CleverBridge), and external APIs.",
      "Managed Linux-based deployments and AWS EC2 production environments — including provisioning, monitoring, and incident response.",
      "Diagnosed production issues, resolved application errors, and implemented security hardening across live environments.",
      "Contributed to HRMS and marketing automation systems, working across database design, backend logic, and API layers.",
    ],
    impactSummary:
      "30+ client projects delivered | 10+ live apps maintained | Emerging Leader Award",
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  featured: boolean;
  diagramType: string;
  flowNodes: string[];
}

export const projects: Project[] = [
  {
    id: "woocommerce-payment-subscriptions",
    number: "01",
    title: "WooCommerce Payment & Subscription Workflows",
    summary: "Custom subscription and payment engine for a multi-market platform.",
    bullets: [
      "Business-specific pricing and renewal logic with WooCommerce Subscriptions.",
      "Gateway hooks for partial payments, retries and failed-renewal recovery.",
      "Custom payment workflow orchestration with Stripe integration.",
    ],
    tags: [
      "WordPress",
      "WooCommerce",
      "WooCommerce Subscriptions",
      "Stripe",
      "PHP",
      "MySQL",
    ],
    featured: true,
    diagramType: "subscription",
    flowNodes: ["Customer", "Stripe", "Webhook", "Renewal", "Retry/Recovery"],
  },
  {
    id: "job-board-payment-apply4itjobs",
    number: "02",
    title: "Job Board Payment Integration, Apply4ITJobs.com",
    summary: "End-to-end Stripe flow for paid job postings on a live job board.",
    bullets: [
      "Service tiers, paid listings, receipts and PCI-compliant handling.",
      "Robust webhook processing for asynchronous payment events.",
      "Custom business logic for the full job-posting payment journey.",
    ],
    tags: ["WordPress", "Stripe", "PHP", "WooCommerce", "jQuery"],
    featured: true,
    diagramType: "jobboard",
    flowNodes: ["Job Post", "Payment", "Webhook", "Listing Live"],
  },
  {
    id: "eloqua-integration-plugin",
    number: "03",
    title: "Custom Eloqua Integration Plugin",
    summary: "Reusable WordPress plugin connecting forms directly to Eloqua CRM.",
    bullets: [
      "Configuration-driven plugin using actions/filters architecture.",
      "Multiple forms and integration points without paid middleware.",
      "Direct Eloqua REST API integration from any WordPress page.",
    ],
    tags: [
      "WordPress",
      "PHP",
      "Eloqua",
      "REST API",
      "Plugin Development",
    ],
    featured: true,
    diagramType: "eloqua",
    flowNodes: ["Form", "WP Hook", "Eloqua REST API", "CRM"],
  },
  {
    id: "cleverbridge-ultraedit",
    number: "04",
    title: "CleverBridge Integration for UltraEdit",
    summary: "Real-time pricing and purchase flow for UltraEdit's WordPress site.",
    bullets: [
      "Catalog custom post type with ACF for product configuration.",
      "Real-time price and product ID lookup from CleverBridge.",
      "Reusable pricing-table shortcode deployable anywhere on site.",
    ],
    tags: [
      "WordPress",
      "PHP",
      "CleverBridge",
      "ACF",
      "WooCommerce",
      "Shortcodes",
    ],
    featured: false,
    diagramType: "cleverbridge",
    flowNodes: ["Product (ACF)", "Price Lookup", "Pricing Table Shortcode"],
  },
  {
    id: "booking-payment-system",
    number: "05",
    title: "Booking & Payment System",
    summary:
      "GeoIP-aware booking with Google Calendar sync and Xendit payments.",
    bullets: [
      "GeoIP-based localized pricing and availability detection.",
      "Automated Google Calendar event creation and confirmation.",
      "Xendit payment link generation within the booking flow.",
    ],
    tags: [
      "PHP",
      "Laravel",
      "Google Calendar API",
      "Xendit",
      "GeoIP",
      "MySQL",
    ],
    featured: false,
    diagramType: "booking",
    flowNodes: [
      "Form",
      "GeoIP",
      "Google Calendar Event",
      "Xendit Payment Link",
    ],
  },
  {
    id: "dynamic-form-builder",
    number: "06",
    title: "Dynamic Form Builder",
    summary:
      "JSON-driven form system for non-technical users, no code changes required.",
    bullets: [
      "Runtime rendering engine from stored JSON schemas.",
      "Reusable validation and submission handling workflows.",
      "Non-technical users build complex forms via a visual interface.",
    ],
    tags: ["PHP", "jQuery", "JSON", "MySQL", "JavaScript"],
    featured: false,
    diagramType: "formbuilder",
    flowNodes: ["JSON Schema", "Renderer", "Submission Handler"],
  },
  {
    id: "hrms-application",
    number: "07",
    title: "HRMS Application",
    summary:
      "Laravel backend HRMS for employee records, attendance, and leave workflows.",
    bullets: [
      "Migrations, relationships, and Eloquent models for complex HR data.",
      "REST API endpoints for frontend and third-party HR tool integration.",
      "Full attendance, leave and employee record management.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "REST API", "MVC"],
    featured: false,
    diagramType: "hrms",
    flowNodes: ["Employee", "Attendance", "Leave", "API"],
  },
];
