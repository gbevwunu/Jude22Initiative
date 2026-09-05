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
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
  };
}
