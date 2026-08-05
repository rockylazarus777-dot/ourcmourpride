import type { NextConfig } from "next";
import path from "path";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

const nextConfig: NextConfig = {
  /* Silence the multiple-lockfile workspace-root warning — only locally */
  ...(isVercel ? {} : { outputFileTracingRoot: path.join(process.cwd(), "..") }),
  /* Never let large public assets (gallery photos, images) get swept into
   * serverless function bundles — they are static files served by the CDN,
   * not something any server function should read at runtime. */
  outputFileTracingExcludes: {
    "/**": ["public/gallery/**", "public/images/**"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
