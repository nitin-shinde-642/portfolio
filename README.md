# Nitin Shinde — Developer Portfolio

A production-ready, fully static personal developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Resend** for contact form delivery.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable         | Description                                      | Required |
|------------------|--------------------------------------------------|----------|
| `RESEND_API_KEY` | Your Resend API key (from [resend.com](https://resend.com/api-keys)) | Yes (for contact form) |
| `CONTACT_EMAIL`  | Email address that receives form submissions     | Yes (for contact form) |

> **Note:** The site builds and runs without these — the contact form will gracefully fail until they're set.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
```

---

## 📦 Bundle Analysis

Visualize your JavaScript bundles:

```bash
ANALYZE=true npm run build
```

---

## 🚢 Deploy to Vercel

### Option A — Vercel CLI

```bash
npx vercel
```

### Option B — GitHub Integration

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add environment variables in the Vercel dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy. Vercel auto-detects Next.js.

---

## 🔧 Personalizing the Site

All content lives in `/data` — **no component editing needed** for common updates:

| File | What to update |
|------|---------------|
| [`data/profile.ts`](./data/profile.ts) | Name, title, location, hero text, siteUrl |
| [`data/skills.ts`](./data/skills.ts) | Skill groups and individual skills |
| [`data/experience.ts`](./data/experience.ts) | Work history, bullets, impact summary |
| [`data/projects.ts`](./data/projects.ts) | Project cards (title, bullets, tags, links) |
| [`data/socials.ts`](./data/socials.ts) | Email, LinkedIn URL, GitHub URL |

### Update Placeholders

Search for these strings and replace with real values:

- `your-email@example.com` → your real email
- `https://linkedin.com/in/your-handle` → your LinkedIn URL
- `https://github.com/your-handle` → your GitHub URL
- `https://nitinshinde.dev` → your actual domain

### Add Your Resume

Replace `public/resume.pdf` with your actual resume PDF.

---

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── actions/
│   │   └── contact.ts          # Server action: Resend email + Zod validation
│   ├── globals.css             # Design tokens (CSS variables), base styles
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, metadata
│   ├── opengraph-image.tsx     # Generated OG image
│   ├── page.tsx                # Single-page composition
│   ├── robots.ts               # robots.txt
│   └── sitemap.ts              # sitemap.xml
│   ├── magicui/
│   │   ├── animated-grid-pattern.tsx   # Magic UI hero background grid
│   │   ├── animated-theme-toggler.tsx  # Magic UI circular view-transition theme switch
│   │   ├── bento-grid.tsx             # Magic UI bento grid and card layout
│   │   ├── border-beam.tsx            # Magic UI glowing border beam for featured cards
│   │   ├── marquee.tsx                # Magic UI infinite scrolling technology strip
│   │   └── number-ticker.tsx          # Magic UI spring-animated count-up stats
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx     # "use client" — form with useActionState
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── shared/
│   │   ├── Footer.tsx
│   │   ├── JsonLd.tsx          # Person structured data
│   │   ├── Navbar.tsx          # "use client" — scroll tracking, mobile menu
│   │   ├── ProjectCard.tsx
│   │   ├── Reveal.tsx          # "use client" — IntersectionObserver animation
│   │   ├── SectionHeading.tsx
│   │   └── ThemeToggle.tsx     # "use client" — next-themes
│   └── ui/
│       ├── badge.tsx
│       ├── brand-icons.tsx     # SVG GitHub + LinkedIn icons
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       └── textarea.tsx
├── data/
│   ├── experience.ts
│   ├── profile.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── socials.ts
├── lib/
│   ├── utils.ts                # cn() helper
│   └── validations.ts          # Zod contact schema
└── public/
    └── resume.pdf              # Replace with your actual resume
```

---

## 📦 Dependencies

| Package | Purpose | Justification |
|---------|---------|---------------|
| `next` | Framework | App Router, SSG, Server Actions, image optimization |
| `react` / `react-dom` | UI library | Required by Next.js |
| `tailwindcss` | Styling | Utility-first CSS, v4 with CSS variable tokens |
| `next-themes` | Dark/light toggle | Flash-free SSR theme switching |
| `lucide-react` | Icons | Tree-shakeable SVG icon library |
| `resend` | Email delivery | Reliable transactional email API |
| `zod` | Form validation | Type-safe schema validation for server action |
| `clsx` + `tailwind-merge` | Class utilities | Conditional class merging without conflicts |
| `@next/bundle-analyzer` | Dev tool | Visualize and optimize JS bundle size |
| `motion` | Animation (installed, available) | Optional — Reveal uses CSS transitions instead for zero bundle cost |

---

## ♿ Accessibility

- Skip-to-content link for keyboard users
- All interactive elements have visible focus rings
- ARIA labels on icon-only buttons
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- Correct heading hierarchy (h1 → h2 → h3)
- `prefers-reduced-motion` respected — all animations disabled
- WCAG AA contrast ratios

---

## ⚡ Performance Notes

- **Server Components by default** — only Navbar, ThemeToggle, Reveal, ContactForm use `"use client"`
- **ContactForm lazy-loaded** with `next/dynamic` — not in initial bundle
- **No opacity-0 on hero** — LCP element visible on first paint
- **CSS transitions only** for animations (transform + opacity) — no JS animation library overhead
- **`content-visibility: auto`** on all below-fold sections
- **`scrollbar-gutter: stable`** prevents layout shift from scrollbar appearing
- Font subsetting via `next/font` with `display: swap`

---

## 🎨 Design Tokens

All tokens are CSS variables — edit once in `globals.css` to retheme the whole site:

| Token | Dark | Light |
|-------|------|-------|
| `--background` | `#0B0F14` | `#FAFAF9` |
| `--surface` | `#121821` | `#FFFFFF` |
| `--border` | `#1F2937` | `#E5E7EB` |
| `--text` | `#E6EAF0` | `#111827` |
| `--muted` | `#9AA4B2` | `#4B5563` |
| `--accent` | `#7C8CFF` | `#4F5BD5` |
| `--availability` | `#34D399` | `#059669` |
