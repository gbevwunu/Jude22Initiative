import { FORM_EMBED, ORG, SOCIALS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import FormEmbed from "@/components/ui/FormEmbed";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a discovery event for your school, ask about mentorship, or start a partnership with The Jude 22 Initiative. Get in touch with the team.",
  path: "/contact",
});

const REASONS = [
  "Booking a discovery event for a school, college or university",
  "Asking about mentorship for a student",
  "Starting a partnership with an organization",
  "Finding out how to give",
];

export default function ContactPage() {
  const confirmedSocials = SOCIALS.filter((social) => social.url.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        lede="Whether you are a school looking to book an event, someone who wants to mentor, or an organization exploring a partnership, this is the place to begin."
      />

      <section className="section-y bg-white" aria-labelledby="contact-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* Details */}
            <div>
              <ScrollReveal>
                <SectionHeader eyebrow="Reach us" title="Contact details" id="contact-heading" />
              </ScrollReveal>

              <ScrollReveal delay={60} className="mt-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-heading text-label font-semibold tracking-[0.1em] text-gold-ink uppercase">
                      Email
                    </h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${ORG.email.value}`}
                        className="inline-flex min-h-[44px] items-center rounded-md text-[1.0625rem] text-navy underline decoration-navy/30 underline-offset-4 transition-colors duration-150 ease-out hover:text-blue-accent hover:decoration-blue-accent"
                      >
                        {ORG.email.value}
                      </a>
                      {ORG.email.needsReview ? <Badge variant="review">Confirm</Badge> : null}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-label font-semibold tracking-[0.1em] text-gold-ink uppercase">
                      Phone
                    </h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${ORG.phone.value.replace(/\s+/g, "")}`}
                        className="inline-flex min-h-[44px] items-center rounded-md text-[1.0625rem] text-navy underline decoration-navy/30 underline-offset-4 transition-colors duration-150 ease-out hover:text-blue-accent hover:decoration-blue-accent"
                      >
                        {ORG.phone.value}
                      </a>
                      {ORG.phone.needsReview ? <Badge variant="review">Confirm</Badge> : null}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-label font-semibold tracking-[0.1em] text-gold-ink uppercase">
                      Location
                    </h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3 text-[1.0625rem] text-grey-900">
                      {ORG.location.value}
                      {ORG.location.needsReview ? <Badge variant="review">Confirm</Badge> : null}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-label font-semibold tracking-[0.1em] text-gold-ink uppercase">
                      Social
                    </h3>
                    {confirmedSocials.length > 0 ? (
                      <ul className="mt-2 flex flex-wrap gap-x-5">
                        {confirmedSocials.map((social) => (
                          <li key={social.label}>
                            <a
                              href={social.url}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="inline-flex min-h-[44px] items-center rounded-md text-[1.0625rem] text-navy underline decoration-navy/30 underline-offset-4 transition-colors duration-150 ease-out hover:text-blue-accent hover:decoration-blue-accent"
                            >
                              {social.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 flex flex-wrap items-center gap-3 text-body-sm text-[var(--muted-fg)]">
                        Profiles are added once the handles are confirmed.
                        <Badge variant="review">Handles pending</Badge>
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={110} className="mt-10">
                <div className="rounded-2xl bg-grey-100 p-6">
                  <h3 className="font-heading text-base font-semibold text-navy">
                    People usually write to us about
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {REASONS.map((reason) => (
                      <li key={reason} className="flex gap-3 text-body-sm text-grey-900">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div>
              <ScrollReveal delay={80}>
                <h2 className="font-heading text-xl font-semibold text-navy">Send us a message</h2>
                <p className="mt-2 max-w-[52ch] text-body-sm text-[var(--muted-fg)]">
                  Fill this in and it reaches the team directly. You will land
                  on a confirmation page once it sends.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={120} className="mt-6">
                <FormEmbed
                  src={FORM_EMBED.contactUrl}
                  title="Contact form"
                  slotName="contactUrl"
                  height={780}
                />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
