import { buildMetadata } from "@/lib/seo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const metadata = {
  ...buildMetadata({
    title: "Thank you",
    description:
      "Thank you for reaching out to The Jude 22 Initiative. We have received your message and will be in touch.",
    path: "/thank-you",
  }),
  /* A confirmation page has no value in search results. */
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="surface-dark bg-navy text-white" aria-labelledby="thanks-heading">
      <Container>
        <div className="flex min-h-[68vh] flex-col justify-center py-20">
          <div className="max-w-[46rem]">
            <svg
              viewBox="0 0 48 48"
              width="48"
              height="48"
              fill="none"
              aria-hidden="true"
              focusable="false"
              className="h-12 w-12"
            >
              <circle cx="24" cy="24" r="21" stroke="var(--color-gold)" strokeWidth="2.5" />
              <path
                d="M15 24.5 L21.5 31 L33 19"
                stroke="var(--color-gold)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 id="thanks-heading" className="text-section font-heading mt-8">
              Thank you. That came through.
            </h1>

            <p className="mt-6 text-lede text-[var(--muted-fg)]">
              Someone from the team will read it properly and get back to you.
              If it was a mentor application, the next step is a short
              conversation and our safeguarding checks before we introduce you
              to anyone.
            </p>

            <p className="mt-4 text-[var(--muted-fg)]">
              In the meantime, there is more to read about how the work runs.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/" variant="primary" size="lg">
                Back to home
              </Button>
              <Button href="/programs" variant="outline" size="lg">
                See our programs
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
