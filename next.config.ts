import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  compress: isProd,
  compiler: { removeConsole: isProd },
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;
