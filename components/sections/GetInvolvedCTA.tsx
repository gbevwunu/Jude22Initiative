import Container from "@/components/ui/Container";
import MentorCTA from "@/components/ui/MentorCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function GetInvolvedCTA() {
  return (
    <section className="bg-white pb-[clamp(4rem,10vw,8rem)]" aria-label="Get involved">
      <Container>
        <ScrollReveal variant="scale-in" duration={750}>
          <MentorCTA />
        </ScrollReveal>
      </Container>
    </section>
  );
}
