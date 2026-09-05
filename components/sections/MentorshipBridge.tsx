import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

const NODES = [
  {
    id: "student",
    label: "A young person",
    body: "Someone who has just found language for what they are good at, and no idea who to ask about it.",
  },
  {
    id: "mentor",
    label: "A proven mentor",
    body: "Someone who has already built something in that exact field, and remembers standing where the student is now.",
  },
] as const;

export default function MentorshipBridge() {
  return (
    <section className="surface-dark section-y bg-navy text-white" aria-labelledby="bridge-heading">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-[46rem] text-center">
            <h2 id="bridge-heading" className="text-section font-heading">
              The bridge is a person, not a program
            </h2>
            <p className="mt-6 text-lede text-[var(--muted-fg)]">
              Potential rarely stalls for lack of talent. It stalls because
              there is nobody in reach who has done the thing before. We close
              that gap deliberately, and then we stay with it.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal offset={0} duration={700} className="mt-16">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
            {/* Node one */}
            <div className="rounded-2xl border border-[var(--hairline)] bg-white/[0.04] p-7 text-center lg:text-left">
              <NodeMark />
              <h3 className="mt-4 font-heading text-xl font-semibold">{NODES[0].label}</h3>
              <p className="mt-2 text-[0.9375rem] text-[var(--muted-fg)]">{NODES[0].body}</p>
            </div>

            {/* Connector: horizontal on desktop, vertical when stacked */}
            <div className="flex items-center justify-center py-2 lg:px-2">
              <svg
                viewBox="0 0 160 12"
                width="160"
                height="12"
                fill="none"
                aria-hidden="true"
                focusable="false"
                className="line-draw-x hidden h-3 w-[160px] lg:block"
              >
                <path
                  d="M6 6 H154"
                  stroke="var(--color-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />
                <circle cx="6" cy="6" r="5" fill="var(--color-gold)" />
                <circle cx="154" cy="6" r="5" fill="var(--color-gold)" />
              </svg>

              <svg
                viewBox="0 0 12 96"
                width="12"
                height="96"
                fill="none"
                aria-hidden="true"
                focusable="false"
                className="line-draw-y h-24 w-3 lg:hidden"
              >
                <path
                  d="M6 6 V90"
                  stroke="var(--color-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />
                <circle cx="6" cy="6" r="5" fill="var(--color-gold)" />
                <circle cx="6" cy="90" r="5" fill="var(--color-gold)" />
              </svg>
            </div>

            {/* Node two */}
            <div className="rounded-2xl border border-[var(--hairline)] bg-white/[0.04] p-7 text-center lg:text-left">
              <NodeMark filled />
              <h3 className="mt-4 font-heading text-xl font-semibold">{NODES[1].label}</h3>
              <p className="mt-2 text-[0.9375rem] text-[var(--muted-fg)]">{NODES[1].body}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mt-12">
          <p className="mx-auto max-w-[52rem] text-center text-[var(--muted-fg)]">
            We match on direction rather than on convenience, agree what both
            sides are committing to before the first meeting, and check in
            afterwards so the relationship stays useful to the person it was
            built for.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function NodeMark({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="mx-auto h-8 w-8 lg:mx-0"
    >
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="var(--color-gold)"
        strokeWidth="2"
        fill={filled ? "var(--color-gold)" : "none"}
      />
      {filled ? null : <circle cx="16" cy="16" r="3.5" fill="var(--color-gold)" />}
    </svg>
  );
}
