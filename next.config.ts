import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },

  // TypeScript strict checking
  typescript: {
    ignoreBuildErrors: false,
  },
};

// Bundle analyzer — run with: ANALYZE=true npm run build
let finalConfig: NextConfig = nextConfig;

if (process.env.ANALYZE === "true") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: true });
  finalConfig = withBundleAnalyzer(nextConfig);
}

export default finalConfig;
