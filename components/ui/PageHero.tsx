import type { ReactNode } from "react";
import Badge from "./Badge";
import Container from "./Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  /** Calls to action, rendered under the lede. */
  children?: ReactNode;
};

/**
 * Shared hero for the inner pages.
 *
 * Gate result: no animation. A visitor reaches these pages by clicking a nav
 * link, so the heading is the thing they just asked for. Fading it in would
 * delay the answer to their own action for no gain. The home hero earns its
 * sequence because it is a first impression rather than a response.
 */
export default function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="surface-dark relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_78%_10%,rgba(46,111,184,0.28),transparent_60%)]"
      />
      <Container className="relative">
        <div className="max-w-[52rem] py-16 sm:py-20 lg:py-24">
          {eyebrow ? (
            <Badge variant="gold" className="mb-6">
              {eyebrow}
            </Badge>
          ) : null}

          <h1 className="text-section font-heading rule-anchor">{title}</h1>

          {lede ? (
            <p className="mt-7 max-w-[58ch] text-lede text-[var(--muted-fg)]">{lede}</p>
          ) : null}

          {children ? <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
