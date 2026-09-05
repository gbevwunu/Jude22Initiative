import { buildMetadata } from "@/lib/seo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = buildMetadata({
  title: "Programs",
  description:
    "Discovery events in high schools, colleges and universities, and mentorship matching that connects students with people who have a track record in their field.",
  path: "/programs",
});

const EVENT_FLOW = [
  {
    step: "01",
    title: "Before the day",
    body: "We agree the year groups, the room and the time with the school, and shape the session around what those students are actually deciding this term.",
  },
  {
    step: "02",
    title: "The session",
    body: "An interactive hour that moves students from a vague sense of what they enjoy to specific language for the gifts they carry, and what those gifts are useful for.",
  },
  {
    step: "03",
    title: "The exercise",
    body: "Students work through a short framework they keep. It gives them a way to test an interest against evidence rather than against a feeling.",
  },
  {
    step: "04",
    title: "After the day",
    body: "Students who want to go further can put their name forward for mentorship, and the school gets a short summary of what came up in the room.",
  },
];

const EVENT_OUTCOMES = [
  "Students can name what they are good at, and say why they think so",
  "A vague ambition becomes a concrete next step they can take this term",
  "Staff hear which students are ready for more than the timetable offers",
  "A route into mentorship exists for the students who want it",
];

const MENTOR_COMMITMENT = [
  {
    title: "A real track record",
    body: "We match on demonstrated experience in the field, not on job title or good intentions. A mentor should have done the thing the student is aiming at.",
  },
  {
    title: "A few hours a month",
    body: "Enough contact for the relationship to be useful and little enough that a working professional can sustain it. We agree the rhythm before it starts.",
  },
  {
    title: "Clear expectations",
    body: "Both sides know what the relationship is for, how long the first commitment runs, and what is not being promised. Nobody is guessing.",
  },
  {
    title: "Safeguarding first",
    body: "Mentors complete our checks before any introduction is made, and sessions follow the safeguarding policy the organisation confirms.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Discovery events, and the mentorship that follows them"
        lede="One puts the question of purpose in front of a whole hall. The other walks the answer out with a young person, one relationship at a time. They are built to work together."
      >
        <Button href="/contact" variant="primary" size="lg">
          Book an event
        </Button>
        <Button href="/get-involved#mentor" variant="outline" size="lg">
          Apply to mentor
        </Button>
      </PageHero>

      {/* Discovery events */}
      <section id="discovery-events" className="scroll-anchor section-y bg-white" aria-labelledby="events-heading">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="In schools and on campus"
              title="Discovery Events"
              id="events-heading"
              lede="A session in a school, college or university that helps students identify the gifts and talents they already carry, and understand what those point toward."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {EVENT_FLOW.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 60}>
                <article className="h-full rounded-2xl border border-[var(--hairline)] bg-white p-7">
                  <span aria-hidden="true" className="font-heading text-meta font-bold text-gold-ink">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2.5 text-body-sm text-[var(--muted-fg)]">{item.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={80} className="mt-12">
            <div className="rounded-2xl bg-grey-100 p-7 lg:p-9">
              <h3 className="font-heading text-lg font-semibold text-navy">
                What a school gets out of it
              </h3>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {EVENT_OUTCOMES.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-body-sm text-grey-900">
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      aria-hidden="true"
                      focusable="false"
                      className="mt-0.5 h-5 w-5 shrink-0"
                    >
                      <circle cx="10" cy="10" r="9" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                      <path
                        d="M6 10.5 L9 13.5 L14.5 7"
                        fill="none"
                        stroke="var(--color-gold-ink)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="/contact" variant="secondary" size="lg">
                  Book an event for your school
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mentorship matching */}
      <section
        id="mentorship-matching"
        className="scroll-anchor surface-dark section-y bg-navy text-white"
        aria-labelledby="matching-heading"
      >
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="One young person, one proven guide"
              title="Mentorship Matching"
              id="matching-heading"
              lede="We connect young people with mentors who have a real track record in the field the student is drawn to, then support the relationship so it lasts beyond the first conversation."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {MENTOR_COMMITMENT.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 60}>
                <article className="h-full rounded-2xl border border-[var(--hairline)] bg-white/[0.04] p-7">
                  <span aria-hidden="true" className="block h-[3px] w-10 rounded-full bg-gold" />
                  <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-body-sm text-[var(--muted-fg)]">{item.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={80} className="mt-12">
            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-white/[0.04] p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9">
              <div>
                <h3 className="font-heading text-xl font-semibold">
                  Ready to be that person for someone
                </h3>
                <p className="mt-2 max-w-[52ch] text-body-sm text-[var(--muted-fg)]">
                  Applications take a few minutes. We follow up with the checks
                  and a short conversation before any match is made.
                </p>
              </div>
              <Button href="/get-involved#mentor" variant="primary" size="lg">
                Apply to mentor
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
