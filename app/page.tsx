import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

/* Phase 1 placeholder. Replaced by the composed home page in Phase 2. */
export default function HomePage() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader
          eyebrow="Phase 1"
          title="Foundation in place"
          lede="Design tokens, layout primitives, navigation and footer are wired up. The composed home page lands in Phase 2."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/get-involved" variant="primary" size="lg">
            Become a Mentor
          </Button>
          <Button href="/programs" variant="outline" size="lg">
            Get Involved
          </Button>
        </div>
      </Container>
    </section>
  );
}
