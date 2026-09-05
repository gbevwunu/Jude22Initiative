import { AUDIENCES, ORG, PILLARS, SITE_URL, SOCIALS } from "./constants";

/**
 * Structured data for the organisation.
 *
 * NGO is a subtype of Organization in schema.org, so declaring both types
 * satisfies consumers that look for either. Fields the client has not yet
 * confirmed are omitted rather than published as placeholders: a wrong
 * telephone number or an invented social profile in structured data is worse
 * than an absent one, because aggregators may republish it.
 */
export function buildOrganizationSchema() {
  const confirmedSocials = SOCIALS.filter((social) => social.url.length > 0).map(
    (social) => social.url,
  );

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    "@id": new URL("/#organization", SITE_URL).toString(),
    name: ORG.name,
    alternateName: ORG.shortName,
    url: SITE_URL,
    slogan: ORG.tagline,
    description: ORG.description,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", SITE_URL).toString(),
    },
    knowsAbout: PILLARS.map((pillar) => pillar.title),
    audience: AUDIENCES.map((audience) => ({
      "@type": "EducationalAudience",
      audienceType: audience.title,
    })),
  };

  /* Only published once a real address is confirmed. */
  if (!ORG.email.needsReview) {
    schema.email = ORG.email.value;
  }

  if (!ORG.phone.needsReview) {
    schema.telephone = ORG.phone.value;
  }

  if (confirmedSocials.length > 0) {
    schema.sameAs = confirmedSocials;
  }

  return schema;
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", SITE_URL).toString(),
    url: SITE_URL,
    name: ORG.name,
    description: ORG.shortDescription,
    inLanguage: "en",
    publisher: { "@id": new URL("/#organization", SITE_URL).toString() },
  };
}
