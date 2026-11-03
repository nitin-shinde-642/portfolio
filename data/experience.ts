export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  impactSummary: string;
}

export const experience: TimelineItem[] = [
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
      "Delivered 30+ client projects and maintained 10+ live web applications. Recognized with the Emerging Leader Award for consistent technical contributions and independent ownership of complex integrations.",
  },
];
