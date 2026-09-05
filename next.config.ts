import type { NextConfig } from "next";

/**
 * Static security headers. The Content Security Policy is not here: it needs
 * a fresh nonce per request, so it is set in middleware.ts. These are
 * mirrored in vercel.json so they are present even on responses that do not
 * pass through the middleware matcher.
 */
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /**
   * Render metadata into <head> before the shell is sent, for every client.
   *
   * These pages render dynamically so the CSP nonce can be stamped onto the
   * script tags. Next's default behaviour on a dynamic route is to stream
   * metadata, which puts <title> and <meta name="description"> at the end of
   * the body instead. React never hoists them into <head>, so they stay in
   * the body even after hydration: non-conformant, invisible to any parser
   * that reads only the head, and flagged by Lighthouse.
   *
   * Next already blocks for known social scrapers, so link previews were
   * unaffected, but everything else saw a document whose head carried no
   * title or description. Widening this to every agent costs nothing here
   * because the metadata is entirely static, with no async work to wait on.
   */
  htmlLimitedBots: /.*/,

  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...SECURITY_HEADERS],
      },
    ];
  },
};

export default nextConfig;
