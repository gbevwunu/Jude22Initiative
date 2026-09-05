import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Origins allowed to be framed by this site. Only the third-party form
 * providers belong here. If the client picks a different provider, update
 * this list and FORM_EMBED in lib/constants.ts together, or the embed will
 * be blocked by the Content Security Policy.
 */
const EMBED_ORIGINS = [
  "https://tally.so",
  "https://*.tally.so",
  "https://form.jotform.com",
  "https://*.jotform.com",
] as const;

/**
 * User agents belonging to automated vulnerability scanners and exploitation
 * frameworks. Matched case insensitively against the full UA string.
 *
 * This is deliberately narrow. It contains no substring that appears in a
 * normal browser or a legitimate crawler UA, so Googlebot, Bingbot and social
 * card fetchers are unaffected. It raises the cost of opportunistic scanning
 * rather than stopping a determined attacker, who can simply change the
 * header. The real controls are the security headers and having no
 * server-side attack surface.
 */
const SCANNER_PATTERNS = [
  "sqlmap",
  "nikto",
  "nessus",
  "acunetix",
  "netsparker",
  "wpscan",
  "dirbuster",
  "gobuster",
  "feroxbuster",
  "havij",
  "metasploit",
  "nuclei",
  "masscan",
  "zgrab",
  "zmeu",
  "arachni",
  "openvas",
  "commix",
  "xsstrike",
  "whatweb",
  "joomscan",
] as const;

function isScanner(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return SCANNER_PATTERNS.some((pattern) => ua.includes(pattern));
}

function buildCsp(nonce: string, isDev: boolean): string {
  const embeds = EMBED_ORIGINS.join(" ");

  /**
   * script-src carries a per-request nonce and never 'unsafe-inline'.
   * 'strict-dynamic' lets a nonced loader pull in the chunks it needs while
   * ignoring host allowlists in browsers that support it.
   *
   * style-src needs 'unsafe-inline': next/font injects inline style, and
   * inline style cannot execute script, so the risk is presentational.
   *
   * Development additionally needs 'unsafe-eval' for React Fast Refresh.
   * That relaxation never reaches production.
   */
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    `frame-src 'self' ${embeds}`,
    `form-action 'self' ${embeds}`,
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  if (isScanner(request.headers.get("user-agent") ?? "")) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const isDev = process.env.NODE_ENV === "development";
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce, isDev);

  /**
   * Next reads the CSP from the *request* headers to stamp the nonce onto the
   * script tags it renders, so it has to be set on both sides.
   */
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      /**
       * Documents only. Static assets, images and the API path are skipped so
       * the nonce work does not run for every chunk request.
       */
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|txt|xml|webmanifest)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
