import { FORM_EMBED, GET_INVOLVED } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FormEmbed from "@/components/ui/FormEmbed";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Become a mentor, volunteer at our discovery events, partner with us as a school or organization, or give to the work. Four ways to back young people finding their purpose.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Four ways to stand behind a young person"
        lede="Every discovery event and every match runs on people who decided to give something. Pick the one that fits what you have."
      />

      {/* Pathways */}
      <section className="section-y bg-white" aria-labelledby="pathways-heading">
        <Container>
          <h2 id="pathways-heading" className="sr-only">
            Ways to get involved
          </h2>

          {/* 1 column on mobile, 2 on tablet, 4 on desktop. */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GET_INVOLVED.map((pathway, index) => (
              <ScrollReveal key={pathway.id} delay={index * 60}>
                <article
                  id={pathway.id}
                  className="flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-white p-7 scroll-anchor"
                >
                  <span aria-hidden="true" className="block h-[3px] w-10 rounded-full bg-gold" />

                  <h3 className="mt-5 font-heading text-xl font-semibold text-navy">
                    {pathway.title}
                  </h3>

                  <p className="mt-2.5 text-body-sm text-[var(--muted-fg)]">{pathway.pitch}</p>

                  {pathway.needsReview ? (
                    <p className="mt-4">
                      <Badge variant="review">Link pending</Badge>
                    </p>
                  ) : null}

                  <div className="mt-auto pt-7">
                    <Button href={pathway.ctaHref} variant="outline" size="md" block>
                      {pathway.ctaLabel}
                    </Button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mentor application */}
      <section id="mentor-form" className="scroll-anchor section-y bg-grey-100" aria-labelledby="mentor-form-heading">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="Become a mentor"
              title="Apply to mentor"
              id="mentor-form-heading"
              lede="Tell us the field you have built in and how much time you can give. We follow up with safeguarding checks and a short conversation before any match is made."
            />
          </ScrollReveal>

          <ScrollReveal delay={70} className="mt-10">
            <FormEmbed
              src={FORM_EMBED.mentorUrl}
              title="Mentor application form"
              slotName="mentorUrl"
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Volunteer */}
      <section id="volunteer-form" className="scroll-anchor section-y bg-white" aria-labelledby="volunteer-form-heading">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="Volunteer"
              title="Help us run the events"
              id="volunteer-form-heading"
              lede="Discovery events take a team on the day and a few people keeping things moving between them. Tell us what you are good at and where you are."
            />
          </ScrollReveal>

          <ScrollReveal delay={70} className="mt-10">
            <FormEmbed
              src={FORM_EMBED.volunteerUrl}
              title="Volunteer sign up form"
              slotName="volunteerUrl"
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Give */}
      <section id="give" className="scroll-anchor section-y bg-grey-100" aria-labelledby="give-heading">
        <Container>
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-dashed border-gold-edge bg-gold/5 p-7 lg:p-10">
              <Badge variant="review">Donation link pending</Badge>

              <h2 id="give-heading" className="mt-5 font-heading text-2xl font-semibold text-navy">
                Give to the work
              </h2>

              <p className="mt-3 max-w-[62ch] text-[var(--muted-fg)]">
                Giving puts a session in front of a hall of students and a
                mentor beside a young person who had nobody to ask. Once the
                organisation confirms how it wants to receive gifts, whether
                that is a donation platform, a bank transfer or a giving page,
                the details replace this panel.
              </p>

              <p className="mt-4 max-w-[62ch] text-meta text-[var(--muted-fg)]">
                No payment provider is wired into this site. Nothing here
                collects card or bank details, and nothing should be added
                without reviewing the security policy in middleware.ts first.
                Steps are in SETUP.md.
              </p>

              <div className="mt-7">
                <Button href="/contact" variant="secondary" size="lg">
                  Ask us how to give
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
