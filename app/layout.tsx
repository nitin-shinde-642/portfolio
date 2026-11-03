import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

// ─── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://nitinshinde.dev"),
  title:
    "Nitin Shinde — Senior PHP Developer | Laravel & WordPress Specialist",
  description:
    "Portfolio of Nitin Shinde, Senior PHP Developer specializing in Laravel, WordPress, WooCommerce & REST APIs. 4.5+ years building reliable web applications. Based in Pune, India.",
  authors: [{ name: "Nitin Shinde" }],
  creator: "Nitin Shinde",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nitinshinde.dev",
    siteName: "Nitin Shinde — Portfolio",
    title:
      "Nitin Shinde — Senior PHP Developer | Laravel & WordPress Specialist",
    description:
      "Portfolio of Nitin Shinde, Senior PHP Developer specializing in Laravel, WordPress, WooCommerce & REST APIs. 4.5+ years building reliable web applications.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nitin Shinde — Senior PHP Developer | Laravel & WordPress Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nitin Shinde — Senior PHP Developer | Laravel & WordPress Specialist",
    description:
      "Portfolio of Nitin Shinde. 4.5+ years building reliable web applications with PHP, Laravel, and WordPress.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nitinshinde.dev",
  },
};

// ─── JSON-LD Person schema ─────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nitin Shinde",
  jobTitle: "Senior PHP Developer",
  url: "https://nitinshinde.dev",
  email: "shindenitin642@gmail.com",
  telephone: "+917620914878",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/nitin-shinde-642",
    "https://www.linkedin.com/in/nitin642/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Cursor glow — follows mouse via CSS custom properties */}
        <div className="cursor-glow" aria-hidden="true" />

        {/* Mouse tracking: updates --mx / --my on <html> for cursor-glow */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  var root = document.documentElement;
  window.addEventListener('mousemove', function (e) {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
})();
`,
          }}
        />

        {children}
      </body>
    </html>
  );
}
