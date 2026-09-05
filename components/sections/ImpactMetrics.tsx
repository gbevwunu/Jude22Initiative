import { METRICS } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import CounterStat from "@/components/ui/CounterStat";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ImpactMetrics() {
  const anyNeedsReview = METRICS.some((metric) => metric.needsReview);

  return (
    <section className="section-y bg-grey-100" aria-labelledby="impact-heading">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Impact so far"
            title="The work, in numbers"
            id="impact-heading"
            align="center"
            lede="Every figure below is a placeholder until the team confirms it. Nothing here is published as fact yet."
          />
        </ScrollReveal>

        {anyNeedsReview ? (
          <ScrollReveal delay={60} className="mt-8 flex justify-center">
            <Badge variant="review">Figures pending confirmation</Badge>
          </ScrollReveal>
        ) : null}

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {METRICS.map((metric, index) => (
            <ScrollReveal
              key={metric.id}
              delay={index * 60}
              variant="scale-in"

            >
              <CounterStat
                value={metric.value}
                label={metric.label}
                suffix={metric.suffix}
                needsReview={metric.needsReview}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
