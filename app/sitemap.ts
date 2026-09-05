import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Indexable routes only.
 *
 * /thank-you is deliberately absent. It is served with noindex because a
 * confirmation page has no value in search results, and listing a noindex URL
 * in a sitemap sends search engines two contradictory instructions. It stays
 * crawlable in robots.txt so the noindex directive can actually be read.
 */
const ROUTES: ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/get-involved", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
