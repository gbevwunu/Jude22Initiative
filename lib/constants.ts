/**
 * Single source of truth for site content and organisation details.
 *
 * Anything the client must confirm before launch is marked with the
 * REVIEW token and, where it is structured data, a `needsReview` flag so
 * the interface can render a visible placeholder badge. Search this file
 * for "{REVIEW}" to find every outstanding item. See SETUP.md.
 */

export const REVIEW = "{REVIEW}" as const;

/* ==========================================================================
   ORGANISATION
   ========================================================================== */

export const ORG = {
  name: "The Jude 22 Initiative",
  shortName: "Jude 22",
  legalName: `The Jude 22 Initiative ${REVIEW} confirm registered legal name`,
  tagline: "Changing the narrative young adults hear.",
  description:
    "The Jude 22 Initiative positively influences young adults by changing the narrative they hear, so they are transformed to take responsibility, build character, increase capacity, embrace mentorship, and strengthen right relationships in readiness for their purpose.",
  shortDescription:
    "We run discovery events in schools and universities and connect students with mentors who have a track record in their field.",
  /** Contact facts the client must confirm before go-live. */
  email: {
    value: "hello@jude22initiative.org",
    needsReview: true,
  },
  phone: {
    value: "+000 000 0000",
    needsReview: true,
  },
  location: {
    value: "City, Country",
    needsReview: true,
  },
  foundedYear: {
    value: "2024",
    needsReview: true,
  },
} as const;

/** Social profiles. Empty `url` means the link is hidden until confirmed. */
export const SOCIALS: ReadonlyArray<{
  label: string;
  url: string;
  needsReview: boolean;
}> = [
  { label: "Instagram", url: "", needsReview: true },
  { label: "LinkedIn", url: "", needsReview: true },
  { label: "X", url: "", needsReview: true },
  { label: "YouTube", url: "", needsReview: true },
];

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

/* ==========================================================================
   THE FIVE PILLARS
   ========================================================================== */

export type PillarIconKey =
  | "responsibility"
  | "character"
  | "capacity"
  | "mentorship"
  | "relationships";

export type Pillar = {
  id: PillarIconKey;
  title: string;
  blurb: string;
  /** Longer form, used on the About page. */
  detail: string;
};

export const PILLARS: ReadonlyArray<Pillar> = [
  {
    id: "responsibility",
    title: "Responsibility",
    blurb:
      "Owning your choices, your effort, and the outcome you are building toward.",
    detail:
      "Responsibility is where transformation starts. A young adult who understands that their decisions carry weight stops waiting for circumstances to change and starts changing what they can reach. We teach responsibility as ownership rather than blame, so that students learn to answer for their effort, their time, and the direction they are moving in.",
  },
  {
    id: "character",
    title: "Character",
    blurb: "Who you are when there is no audience and no shortcut in sight.",
    detail:
      "Talent opens a door, character decides whether you stay in the room. We help young adults build the internal standards that hold when pressure arrives: honesty when a lie would be easier, discipline when motivation runs out, and integrity when nobody is checking. Character is the foundation everything else is built on.",
  },
  {
    id: "capacity",
    title: "Capacity",
    blurb:
      "Growing the skill and the strength to carry what your purpose will ask of you.",
    detail:
      "Purpose without capacity becomes frustration. We focus on the deliberate work of increasing what a young person can carry: sharpening skill, widening knowledge, and building the resilience that turns a gift into a contribution. Capacity is not given, it is grown, and it grows fastest under guidance.",
  },
  {
    id: "mentorship",
    title: "Mentorship",
    blurb:
      "Walking with someone who has already travelled the road ahead of you.",
    detail:
      "Nobody arrives at purpose alone. Mentorship shortens the distance between potential and practice by putting a young person in regular contact with someone who has a track record in the field they are drawn to. We treat mentorship as a relationship, not a transaction, and we prepare both sides for it.",
  },
  {
    id: "relationships",
    title: "Right Relationships",
    blurb:
      "The people closest to you set the ceiling on where you are going.",
    detail:
      "Direction is contagious. We help young adults evaluate the relationships shaping their thinking and choose company that pulls them toward their purpose rather than away from it. Right relationships are not about leaving people behind, they are about building a circle that can carry weight with you.",
  },
];

/* ==========================================================================
   PROGRAMS
   ========================================================================== */

export type Program = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  points: ReadonlyArray<string>;
  ctaLabel: string;
  ctaHref: string;
};

export const PROGRAMS: ReadonlyArray<Program> = [
  {
    id: "discovery-events",
    eyebrow: "In schools and on campus",
    title: "Discovery Events",
    blurb:
      "Sessions in high schools, colleges, and universities that help students identify the gifts and talents they already carry, and understand what those point toward.",
    points: [
      "Interactive sessions on discovering gifts, talents, and purpose",
      "Practical frameworks students can use the same week",
      "Delivered on site, built around the school timetable",
      "Follow up pathways into mentorship for students who want to go further",
    ],
    ctaLabel: "Book an event",
    ctaHref: "/contact",
  },
  {
    id: "mentorship-matching",
    eyebrow: "One young person, one proven guide",
    title: "Mentorship Matching",
    blurb:
      "We connect young people with mentors who have a real track record in the field the student is drawn to, then support the relationship so it lasts.",
    points: [
      "Matching based on the student's direction, not on convenience",
      "Mentors with demonstrated experience in their field",
      "Clear expectations agreed by both sides before the first meeting",
      "Ongoing check ins so the relationship stays useful",
    ],
    ctaLabel: "Become a mentor",
    ctaHref: "/get-involved",
  },
];

/* ==========================================================================
   GET INVOLVED PATHWAYS
   ========================================================================== */

export type Pathway = {
  id: string;
  title: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
  /** True when the destination is still a placeholder awaiting the client. */
  needsReview?: boolean;
};

export const GET_INVOLVED: ReadonlyArray<Pathway> = [
  {
    id: "mentor",
    title: "Become a Mentor",
    pitch:
      "If you have built something in your field, a young person is looking for exactly the road you have already walked. Give a few hours a month and change a trajectory.",
    ctaLabel: "Apply to mentor",
    ctaHref: "#mentor-form",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    pitch:
      "Help us run discovery events, support students on the day, and keep the work moving behind the scenes. Every event takes a team.",
    ctaLabel: "Volunteer with us",
    ctaHref: "#volunteer-form",
  },
  {
    id: "partner",
    title: "Partner",
    pitch:
      "Schools, universities, and organizations partner with us to bring discovery events to their students and open mentorship pathways for them.",
    ctaLabel: "Start a conversation",
    ctaHref: "/contact",
  },
  {
    id: "give",
    title: "Give",
    pitch:
      "Your giving puts a session in front of a hall of students and a mentor beside a young person who had nobody to ask. It goes directly into the work.",
    ctaLabel: "Give to the work",
    ctaHref: "/contact",
    needsReview: true,
  },
];

/* ==========================================================================
   IMPACT METRICS
   Every value below is a placeholder. Replace with confirmed figures.
   ========================================================================== */

export type Metric = {
  id: string;
  label: string;
  value: number;
  /** Rendered after the number, for example "+". */
  suffix?: string;
  needsReview: boolean;
};

export const METRICS: ReadonlyArray<Metric> = [
  { id: "students", label: "Students Reached", value: 1200, suffix: "+", needsReview: true },
  { id: "schools", label: "Schools Visited", value: 18, suffix: "", needsReview: true },
  { id: "mentors", label: "Mentors Engaged", value: 40, suffix: "+", needsReview: true },
  { id: "events", label: "Events Held", value: 25, suffix: "", needsReview: true },
];

/* ==========================================================================
   WHO WE SERVE
   ========================================================================== */

export const AUDIENCES: ReadonlyArray<{ title: string; blurb: string }> = [
  {
    title: "High school students",
    blurb:
      "At the point where subject choices start to shape options, we help students see what they are naturally drawn to and why it matters.",
  },
  {
    title: "College students",
    blurb:
      "Between school and a career, we give students language for their gifts and a realistic view of where those gifts can go.",
  },
  {
    title: "University students",
    blurb:
      "Close to the working world, we connect students with mentors already doing the thing they are studying toward.",
  },
];

/* ==========================================================================
   THIRD PARTY FORM EMBED
   The CSP frame-src allowlist in middleware.ts must match whichever
   provider is used. See SETUP.md before changing this.
   ========================================================================== */

export const FORM_EMBED = {
  /** Set to the published Tally or JotForm embed URL when available. */
  mentorUrl: "",
  volunteerUrl: "",
  contactUrl: "",
  needsReview: true,
} as const;

/** Developer credit. Required in the footer. */
export const CREDIT = {
  label: "Website by GB Tech",
  href: "https://gbgrouphq.com",
} as const;

/** Used whenever the environment does not supply a usable origin. */
const FALLBACK_SITE_URL = "https://www.jude22initiative.org";

/**
 * Resolves the public origin used for metadataBase, canonicals, the sitemap
 * and robots.txt.
 *
 * This is deliberately defensive rather than a `??` fallback. `??` only
 * catches null and undefined, so a variable that exists but is set to an
 * empty string passes straight through, and `new URL("")` then throws
 * ERR_INVALID_URL while the build is collecting page data. That failure
 * cannot happen locally, where the variable is simply unset, so it only
 * appears in a deployment: exactly the place it is most expensive to find.
 *
 * Handled here: unset, empty, whitespace, a bare domain with no protocol,
 * and a trailing slash. Anything genuinely unparseable falls back rather
 * than taking the build down, because a wrong canonical URL is a
 * recoverable SEO problem and a failed deploy is an outage.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return FALLBACK_SITE_URL;

  /* Accepts "example.org" as readily as "https://example.org". */
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.hostname.length === 0) return FALLBACK_SITE_URL;

    /* Origin only, with any trailing slash or path dropped, so callers can
       safely resolve paths against it. */
    return parsed.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/** Absolute site origin, used for metadataBase, canonicals and sitemap. */
export const SITE_URL = resolveSiteUrl();
