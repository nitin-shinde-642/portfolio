export interface Project {
  id: string;
  title: string;
  outcome: string;
  bullets: string[];
  tags: string[];
  featured: boolean;
  demoUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    id: "woocommerce-payment-subscriptions",
    title: "WooCommerce Payment & Subscription Workflows",
    outcome: "Custom subscription and payment engine handling complex billing rules for a multi-market e-commerce platform.",
    bullets: [
      "Customized WooCommerce Subscriptions to support business-specific pricing rules and renewal logic.",
      "Integrated Stripe and additional payment services with custom payment workflow orchestration.",
      "Implemented gateway-specific hooks to handle partial payments, retries, and failed-renewal recovery.",
    ],
    tags: ["WordPress", "WooCommerce", "WooCommerce Subscriptions", "Stripe", "PHP", "MySQL"],
    featured: true,
  },
  {
    id: "job-board-payment-apply4itjobs",
    title: "Job Board Payment Integration (Apply4ITJobs.com)",
    outcome: "End-to-end Stripe payment flow enabling paid job-posting and application services on a live job board.",
    bullets: [
      "Integrated Stripe into the job application and payment workflow on Apply4ITJobs.com.",
      "Implemented custom business logic for service tiers, paid listings, and receipt generation.",
      "Ensured PCI-compliant data handling and robust webhook processing for asynchronous payment events.",
    ],
    tags: ["WordPress", "Stripe", "PHP", "WooCommerce", "jQuery"],
    featured: true,
  },
  {
    id: "eloqua-integration-plugin",
    title: "Custom Eloqua Integration Plugin",
    outcome: "Reusable WordPress plugin enabling direct Eloqua CRM form submission from any site page without third-party connectors.",
    bullets: [
      "Developed a standalone WordPress plugin for direct Eloqua integration using the Eloqua REST API.",
      "Used WordPress actions and filters to build a configuration-driven, reusable integration framework.",
      "Supported multiple forms and integration points, eliminating the need for paid middleware services.",
    ],
    tags: ["WordPress", "PHP", "Eloqua", "REST API", "Plugin Development"],
    featured: true,
  },
  {
    id: "cleverbridge-ultraedit",
    title: "CleverBridge Integration for UltraEdit",
    outcome: "Pricing and purchase flow connecting UltraEdit's WordPress site to CleverBridge's e-commerce platform.",
    bullets: [
      "Created a Catalog custom post type for Data Architect and Data Architect Pro products with Advanced Custom Fields configuration.",
      "Developed a pricing calculation function to retrieve real-time prices and CleverBridge product IDs.",
      "Built a reusable shortcode for rendering configurable pricing tables anywhere on the site.",
    ],
    tags: ["WordPress", "PHP", "CleverBridge", "ACF", "WooCommerce", "Shortcodes"],
    featured: false,
  },
  {
    id: "booking-payment-system",
    title: "Booking & Payment System",
    outcome: "GeoIP-aware booking form with Google Calendar sync and Xendit payment link generation.",
    bullets: [
      "Developed a booking form with GeoIP-based country detection for localized pricing and availability.",
      "Integrated Google Calendar API for automated calendar event creation and confirmation workflows.",
      "Integrated Xendit payment links for seamless payment processing within the booking flow.",
    ],
    tags: ["PHP", "Laravel", "Google Calendar API", "Xendit", "GeoIP", "MySQL"],
    featured: false,
  },
  {
    id: "dynamic-form-builder",
    title: "Dynamic Form Builder",
    outcome: "JSON-driven form builder enabling non-technical users to create and configure complex forms without code changes.",
    bullets: [
      "Developed a dynamic form builder using jQuery Form Builder with JSON-based form definitions.",
      "Implemented a rendering engine that generates configurable forms from stored JSON schemas at runtime.",
      "Built reusable form submission handling to support different validation rules and backend workflows.",
    ],
    tags: ["PHP", "jQuery", "JSON", "MySQL", "JavaScript"],
    featured: false,
  },
  {
    id: "hrms-application",
    title: "HRMS Application",
    outcome: "Internal Human Resource Management System handling employee records, attendance, and leave workflows.",
    bullets: [
      "Contributed to backend development of a Laravel-based HRMS covering employee records and attendance.",
      "Designed database migrations, relationships, and Eloquent models for complex HR data structures.",
      "Implemented REST API endpoints for frontend consumption and third-party HR tool integration.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "REST API", "MVC"],
    featured: false,
  },
];
