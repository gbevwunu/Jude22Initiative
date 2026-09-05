import type { Metadata } from "next";
import { headers } from "next/headers";
import { ORG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/schema";
import Hero from "@/components/sections/Hero";
import MissionStatement from "@/components/sections/MissionStatement";
import FivePillars from "@/components/sections/FivePillars";
import WhatWeDo from "@/components/sections/WhatWeDo";
import MentorshipBridge from "@/components/sections/MentorshipBridge";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import GetInvolvedCTA from "@/components/sections/GetInvolvedCTA";

export const metadata: Metadata = buildMetadata({
  title: `${ORG.name} | Mentorship, Character, and Purpose for Young Adults`,
  description:
    "The Jude 22 Initiative changes the narrative young adults hear. We run discovery events in schools and universities and connect students with proven mentors.",
  path: "/",
  /* The full title is already the organisation name, so the social title does
     not repeat it. */
  socialTitle: `${ORG.name}: ${ORG.tagline}`,
});

export default async function HomePage() {
  /* Same nonce the middleware put on the response, so the structured data
     block satisfies the script-src policy. */
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const jsonLd = [buildOrganizationSchema(), buildWebSiteSchema()];

  return (
    <>
      {/* Structured data is a fixed, server-built object, never user input. */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <MissionStatement />
      <FivePillars />
      <WhatWeDo />
      <MentorshipBridge />
      <ImpactMetrics />
      <GetInvolvedCTA />
    </>
  );
}
