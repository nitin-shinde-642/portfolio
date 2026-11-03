"use client";

import { Marquee } from "@/components/magicui/marquee";
import { marqueeItems } from "@/lib/data";

// Helper icons for technologies
function TechIcon({ name }: { name: string }) {
  switch (name) {
    case "PHP 8+":
      return (
        <svg className="w-4 h-4 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "Laravel":
      return (
        <svg className="w-4 h-4 text-[#EF4444]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 1.5l8.7 5v10l-8.7 5-8.7-5v-10l8.7-5zm0 2.3L5.2 7.7v7.5l6.7 3.8 6.7-3.8V7.7l-6.7-3.9z" />
        </svg>
      );
    case "WordPress":
      return (
        <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M7 8l3 9 2.5-7.5L15 17l3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case "WooCommerce":
      return (
        <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "REST APIs":
      return (
        <svg className="w-4 h-4 text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "MySQL":
      return (
        <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg className="w-4 h-4 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 9h8M12 9v8" />
        </svg>
      );
    case "React":
      return (
        <svg className="w-4 h-4 text-[#06B6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "Next.js":
      return (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M9 8v8l7-8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case "Stripe":
      return (
        <svg className="w-4 h-4 text-[#6366F1]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.97 15.697.5 12.522.5 6.845.5 3.018 3.52 3.018 8.64c0 6.643 9.155 5.568 9.155 8.435 0 .998-.82 1.49-2.227 1.49-2.26 0-5.334-1.12-7.227-2.317l-.92 5.59C3.606 22.84 6.85 23.5 10.025 23.5c6.012 0 9.878-2.918 9.878-8.23 0-7.07-5.927-6.12-5.927-6.12z" />
        </svg>
      );
    case "AWS EC2":
      return (
        <svg className="w-4 h-4 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case "ACF Pro":
      return (
        <svg className="w-4 h-4 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "Dokan":
      return (
        <svg className="w-4 h-4 text-[#EC4899]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    default:
      return (
        <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
      );
  }
}

export function MarqueeSection() {
  const half = Math.ceil(marqueeItems.length / 2);
  const row1 = marqueeItems.slice(0, half);
  const row2 = marqueeItems.slice(half);

  return (
    <section
      id="tech-marquee"
      aria-label="Technologies Marquee"
      className="relative w-full overflow-hidden border-b border-white/[0.08] bg-[#09090B] py-10"
    >
      {/* Edge gradient fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-36 bg-gradient-to-r from-[#09090B] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-36 bg-gradient-to-l from-[#09090B] to-transparent z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4">
        {/* Row 1 - scrolling left */}
        <Marquee pauseOnHover className="[--duration:28s]">
          {row1.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#111114] px-4 py-2 text-sm font-medium text-[#FAFAFA] font-jetbrains-mono shadow-sm transition-all duration-200 hover:border-[#8B5CF6]/50 hover:bg-[#18181B] hover:scale-105"
            >
              <TechIcon name={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </Marquee>

        {/* Row 2 - scrolling right */}
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {row2.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#111114] px-4 py-2 text-sm font-medium text-[#FAFAFA] font-jetbrains-mono shadow-sm transition-all duration-200 hover:border-[#22D3EE]/50 hover:bg-[#18181B] hover:scale-105"
            >
              <TechIcon name={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
