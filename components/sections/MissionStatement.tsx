import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MissionStatement() {
  return (
    <section className="section-y bg-white" aria-labelledby="mission-heading">
      <Container>
        <ScrollReveal variant="clip" duration={800}>
          <div className="mx-auto max-w-[54rem] text-center">
            <h2
              id="mission-heading"
              className="font-heading text-xs font-semibold tracking-[0.14em] text-gold-ink uppercase"
            >
              Our mission
            </h2>
            <p className="mt-6 font-heading text-[clamp(1.5rem,3.2vw,2.375rem)] leading-[1.28] font-semibold tracking-[-0.015em] text-balance text-navy">
              We exist to positively influence young adults by changing the
              narrative they hear, so they are transformed to take
              responsibility, build character, increase capacity, embrace
              mentorship, and strengthen right relationships in readiness for
              their purpose.
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-8 block h-[3px] w-14 rounded-full bg-gold"
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
