import type { Metadata } from "next";
import { ORG, SITE_URL } from "./constants";

type PageSeo = {
  /** Page title without the organisation suffix, which the template adds. */
  title: string;
  description: string;
  /** Route path beginning with a slash. */
  path: string;
  /** Overrides the shared social title when the page needs a shorter one. */
  socialTitle?: string;
};

/**
 * Builds a page's metadata so title, description, canonical, Open Graph and
 * Twitter never drift apart. metadataBase is set once in the root layout and
 * comes from NEXT_PUBLIC_SITE_URL, so nothing here hardcodes a domain.
 */
export function buildMetadata({
  title,
  description,
  path,
  socialTitle,
}: PageSeo): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const social = socialTitle ?? `${title} | ${ORG.name}`;

  /**
   * The generated share image is referenced explicitly rather than left to
   * the opengraph-image file convention. That convention only applies to the
   * route segment holding the file, and is not inherited by child segments,
   * so every page except the home page would otherwise ship with no share
   * image at all.
   */
  const shareImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${ORG.name}: ${ORG.tagline}`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: social,
      description,
      url,
      siteName: ORG.name,
      type: "website",
      locale: "en_US",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: [shareImage],
    },
  };
}
