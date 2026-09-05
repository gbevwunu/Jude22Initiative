import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * The site is fully crawlable. /thank-you is not disallowed here on purpose:
 * it carries a noindex directive, and a crawler has to be able to fetch the
 * page to see that directive at all. Blocking it in robots.txt would leave it
 * eligible to appear as a bare URL in results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
