import { AUDIENCES, ORG, PILLARS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import PillarIcon from "@/components/ui/PillarIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = buildMetadata({
  title: "About",
  description:
    "The Jude 22 Initiative exists to change the narrative young adults hear. Read our mission, our vision, the five pillars we build on, and who we serve.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We change what young adults hear about themselves"
        lede="Most young people are not short of potential. They are short of a voice that tells them the truth about it, and a person who has already walked the road they are looking at."
      >
        <Button href="/get-involved" variant="primary" size="lg">
          Become a Mentor
        </Button>
        <Button href="/programs" variant="outline" size="lg">
          See our programs
        </Button>
      </PageHero>

      {/* Mission narrative */}
      <section className="section-y bg-white" aria-labelledby="mission-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <ScrollReveal>
              <SectionHeader eyebrow="Our mission" title="The narrative comes first" id="mission-heading" />
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="flex flex-col gap-5 text-[1.0625rem] text-grey-900">
                <p>
                  {ORG.description}
                </p>
                <p>
                  We start with the narrative because it is the part nobody
                  audits. A young person absorbs a running commentary about
                  what they are worth, what people like them go on to do, and
                  which doors are realistically open. Long before ability
                  becomes the limit, that commentary has already set the
                  ceiling.
                </p>
                <p>
                  So we go to where young people already are, in schools,
                  colleges and universities, and we interrupt it. Not with
                  motivation that fades by the weekend, but with a clear look
                  at the gifts they carry, language for what those gifts point
                  toward, and a route to someone who is already doing it.
                </p>
                <p>
                  What follows is ordinary and slow in the best way.
                  Responsibility gets owned. Character gets built under
                  pressure. Capacity grows because someone is stretching it.
                  Mentorship turns a guess into a plan. And the relationships
                  around a young person start pulling in the same direction as
                  their purpose.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="surface-dark section-y bg-navy text-white" aria-labelledby="vision-heading">
        <Container>
          <ScrollReveal variant="clip" duration={800}>
            <div className="mx-auto max-w-[52rem] text-center">
              <h2
                id="vision-heading"
                className="font-heading text-xs font-semibold tracking-[0.14em] text-gold-soft uppercase"
              >
                Our vision
              </h2>
              <p className="mt-6 font-heading text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.32] font-semibold tracking-[-0.015em] text-balance">
                A generation of young adults who know what they carry, who have
                the character to hold it, and who are within reach of someone
                who has done it before them.
              </p>
              <span aria-hidden="true" className="mx-auto mt-8 block h-[3px] w-14 rounded-full bg-gold" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Pillars expanded */}
      <section className="section-y bg-white" aria-labelledby="pillars-heading">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="What we build"
              title="The five pillars, in full"
              id="pillars-heading"
              lede="These are not values on a wall. Each one is a thing we are actively trying to produce in a young person, and each one is measurable in how they act."
            />
          </ScrollReveal>

          <div className="mt-14 flex flex-col gap-4">
            {PILLARS.map((pillar, index) => (
              <ScrollReveal key={pillar.id} delay={index * 50}>
                <article className="grid gap-5 rounded-2xl border border-[var(--hairline)] bg-white p-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7 lg:p-9">
                  <div className="flex sm:block">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-grey-100 text-navy">
                      <PillarIcon name={pillar.id} />
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-heading text-xl font-semibold text-navy lg:text-2xl">
                        {pillar.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="font-heading text-sm font-semibold text-gold-ink"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 text-[1.0625rem] text-grey-900">{pillar.detail}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="section-y bg-grey-100" aria-labelledby="serve-heading">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="Who we serve"
              title="Students at the point where direction is still being set"
              id="serve-heading"
              align="center"
              lede="We work with young people while the questions are still open, because that is when an honest answer changes the most."
            />
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {AUDIENCES.map((audience, index) => (
              <ScrollReveal key={audience.title} delay={index * 60}>
                <article className="h-full rounded-2xl border border-[var(--hairline)] bg-white p-7">
                  <span aria-hidden="true" className="block h-[3px] w-10 rounded-full bg-gold" />
                  <h3 className="mt-5 font-heading text-lg font-semibold text-navy">
                    {audience.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] text-[var(--muted-fg)]">{audience.blurb}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership, pending client content */}
      <section className="section-y bg-white" aria-labelledby="team-heading">
        <Container>
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-dashed border-gold-edge bg-gold/5 p-7 lg:p-10">
              <Badge variant="review">Awaiting client content</Badge>
              <h2 id="team-heading" className="mt-5 font-heading text-2xl font-semibold text-navy">
                Leadership and team
              </h2>
              <p className="mt-3 max-w-[62ch] text-[var(--muted-fg)]">
                Bios for the founder, trustees and team go here once the
                organisation supplies them. Each entry needs a name, a role, two
                or three sentences, and a square photograph. Add them to a TEAM
                array in lib/constants.ts and this block becomes the grid that
                renders them. Instructions are in SETUP.md.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
