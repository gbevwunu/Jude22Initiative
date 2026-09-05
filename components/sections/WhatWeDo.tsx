import { PROGRAMS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import ProgramCard from "@/components/ui/ProgramCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function WhatWeDo() {
  return (
    <section className="section-y bg-white" aria-labelledby="what-we-do-heading">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="What we do"
            title="Two ways we reach young people"
            id="what-we-do-heading"
            lede="One puts the question of purpose in front of a whole hall. The other walks the answer out with a young person, one relationship at a time."
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROGRAMS.map((program, index) => (
            <ScrollReveal key={program.id} delay={index * 70}>
              <ProgramCard program={program} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
