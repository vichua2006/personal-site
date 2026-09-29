import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.CLOUDFLARE_STATIC_EXPORT === "1" ? "export" : undefined,
};

export default nextConfig;
