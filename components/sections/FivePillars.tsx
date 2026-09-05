import { PILLARS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import PillarCard from "@/components/ui/PillarCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Desktop layout is 3 + 2 rather than 5 across.
 *
 * Five equal columns inside the 1200px container leaves roughly 208px per
 * card, which is too narrow for a title and a line of description without
 * ragged wrapping. A six column grid with each card spanning two gives three
 * on the first row, and the last two are offset by one column so they sit
 * centred beneath rather than hanging to the left.
 */
export default function FivePillars() {
  return (
    <section className="section-y bg-grey-100" aria-labelledby="pillars-heading">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="What we build"
            title="Five pillars"
            id="pillars-heading"
            align="center"
            lede="Everything we run comes back to these five. They are the difference between a young person with potential and a young person moving toward purpose."
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {PILLARS.map((pillar, index) => (
            <ScrollReveal
              key={pillar.id}
              delay={index * 60}
              duration={650}
              className={`lg:col-span-2 ${
                index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : ""
              }`}
            >
              <PillarCard pillar={pillar} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
