"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GrowthAccent from "@/components/ui/GrowthAccent";

/**
 * Hero entrance.
 *
 * Gate: first-time tier. A visitor sees this once per session, which is where
 * the delight budget lives, so the sequence runs longer than the 300ms UI cap.
 * Purpose is orchestration: the beats arrive in reading order, so the eye is
 * led headline, then accent, then subhead, then the calls to action.
 *
 * Replay guard. The keyframe classes are always rendered, so server and
 * client markup match, and CSS alone decides whether the sequence runs. The
 * decision has to be made in the cascade rather than in React state: these
 * classes ship in the server HTML, so the animation begins at first paint,
 * long before hydration could remove them.
 *
 * On a reload inside the same session the inline script in the document sets
 * data-hero before paint, and the guard suppresses the sequence from the very
 * first frame. On a first visit the attribute is absent, the sequence plays,
 * and it is set below only after the run has finished, so the guard can never
 * cancel the animation it exists to protect.
 */
/** Longest beat is the closing line: 560ms delay plus a 700ms run. */
const SEQUENCE_MS = 1300;

export default function Hero() {
  useEffect(() => {
    try {
      /* Recorded immediately, so a reload knows before it paints. */
      sessionStorage.setItem("j22-hero", "1");
    } catch {
      /* Private mode or blocked storage. The sequence simply plays again. */
    }

    /* Deferred past the end of the run, so a later client side mount is
       suppressed without this one being cut short. */
    const timer = window.setTimeout(() => {
      document.documentElement.setAttribute("data-hero", "played");
    }, SEQUENCE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const step = (name: string) => `hero-step ${name}`;

  return (
    <section className="surface-dark relative overflow-hidden bg-navy text-white">
      {/* Leadership: the solid navy block the hero content sits on. It shares
          its colour with the header, so the two read as one surface on load. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_18%,rgba(46,111,184,0.32),transparent_62%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16 lg:py-28 xl:py-32">
          <div>
            <h1 className={`text-hero font-heading max-w-[20ch] ${step("hero-headline")}`}>
              Changing the narrative young adults hear.
            </h1>

            <p
              className={`mt-7 max-w-[54ch] text-lede text-[var(--muted-fg)] ${step("hero-subhead")}`}
            >
              We run discovery events in schools and universities, then connect
              students with mentors who have already built something in the
              field they are drawn to.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className={step("hero-cta-1")}>
                <Button href="/get-involved" variant="primary" size="lg" block>
                  Become a Mentor
                </Button>
              </div>
              <div className={step("hero-cta-2")}>
                <Button href="/programs" variant="outline" size="lg" block>
                  Get Involved
                </Button>
              </div>
            </div>

            <p
              className={`mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted-fg)] ${step("hero-meta")}`}
            >
              <span>Responsibility</span>
              <span aria-hidden="true" className="text-gold">
                /
              </span>
              <span>Character</span>
              <span aria-hidden="true" className="text-gold">
                /
              </span>
              <span>Capacity</span>
              <span aria-hidden="true" className="text-gold">
                /
              </span>
              <span>Mentorship</span>
              <span aria-hidden="true" className="text-gold">
                /
              </span>
              <span>Right Relationships</span>
            </p>
          </div>

          <div className={`hidden justify-self-end lg:block ${step("hero-accent")}`}>
            <GrowthAccent className="h-auto w-full max-w-[360px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
