import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const base = (process.env.API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${base}/api/:path*` }];
  },
};

export default nextConfig;
