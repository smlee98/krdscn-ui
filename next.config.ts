import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.30.1.221"],
  compress: isProd,
  compiler: { removeConsole: isProd },
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;
