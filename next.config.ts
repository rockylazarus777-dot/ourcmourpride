import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Silence the multiple-lockfile workspace-root warning */
  outputFileTracingRoot: path.join(process.cwd(), ".."),
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
