import type { Metadata } from "next";
import { ORG, SITE_URL } from "@/lib/constants";
import Hero from "@/components/sections/Hero";
import MissionStatement from "@/components/sections/MissionStatement";
import FivePillars from "@/components/sections/FivePillars";
import WhatWeDo from "@/components/sections/WhatWeDo";
import MentorshipBridge from "@/components/sections/MentorshipBridge";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import GetInvolvedCTA from "@/components/sections/GetInvolvedCTA";

export const metadata: Metadata = {
  title: `${ORG.name} | Mentorship, Character, and Purpose for Young Adults`,
  description:
    "The Jude 22 Initiative changes the narrative young adults hear. We run discovery events in schools and universities and connect students with proven mentors.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${ORG.name} | Mentorship, Character, and Purpose for Young Adults`,
    description:
      "Discovery events in schools and universities, and mentorship that connects students with people who have a track record in their field.",
    url: new URL("/", SITE_URL).toString(),
    type: "website",
  },
  twitter: {
    title: `${ORG.name} | Mentorship, Character, and Purpose for Young Adults`,
    description:
      "Discovery events in schools and universities, and mentorship that connects students with people who have a track record in their field.",
  },
};

export default function HomePage() {
  return (
    <>
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
