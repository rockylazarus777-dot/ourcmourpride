import type { NextConfig } from "next";
import path from "path";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

const nextConfig: NextConfig = {
  /* Silence the multiple-lockfile workspace-root warning — only locally */
  ...(isVercel ? {} : { outputFileTracingRoot: path.join(process.cwd(), "..") }),
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
