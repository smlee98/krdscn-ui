import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

function normalizeBasePath(value?: string) {
  if (!value) return undefined
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.replace(/\/$/, "") || undefined
}

const basePath = normalizeBasePath(process.env.GITHUB_PAGES_BASE_PATH)

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.30.1.221"],
  compress: isProd,
  compiler: { removeConsole: isProd },
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false },
}

export default createMDX()(nextConfig)
