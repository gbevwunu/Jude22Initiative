import Link from "next/link";
import { CREDIT, NAV_ITEMS, ORG, SOCIALS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

const PROGRAM_LINKS = [
  { label: "Discovery Events", href: "/programs#discovery-events" },
  { label: "Mentorship Matching", href: "/programs#mentorship-matching" },
  { label: "Book an event", href: "/contact" },
];

const INVOLVEMENT_LINKS = [
  { label: "Become a Mentor", href: "/get-involved#mentor" },
  { label: "Volunteer", href: "/get-involved#volunteer" },
  { label: "Partner with us", href: "/get-involved#partner" },
  { label: "Give", href: "/get-involved#give" },
];

const linkClass =
  "inline-flex min-h-[44px] items-center rounded-md text-body-sm text-white/80 transition-colors duration-150 ease-out hover:text-gold-soft";

export default function Footer() {
  const year = new Date().getFullYear();
  const confirmedSocials = SOCIALS.filter((social) => social.url.length > 0);

  return (
    <footer className="surface-dark bg-navy text-white">
      <Container>
        <div className="section-y">
          {/* 1 column on mobile, 2 on tablet, 4 on desktop. */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center rounded-md text-white transition-colors duration-150 ease-out hover:text-gold-soft"
              >
                <Logo />
              </Link>
              <p className="mt-5 max-w-[42ch] text-body-sm text-[var(--muted-fg)]">
                {ORG.shortDescription}
              </p>
            </div>

            <nav aria-labelledby="footer-explore">
              <h2
                id="footer-explore"
                className="font-heading text-label font-semibold tracking-[0.1em] text-gold-soft uppercase"
              >
                Explore
              </h2>
              <ul className="mt-3 flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-programs">
              <h2
                id="footer-programs"
                className="font-heading text-label font-semibold tracking-[0.1em] text-gold-soft uppercase"
              >
                Programs
              </h2>
              <ul className="mt-3 flex flex-col">
                {PROGRAM_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2
                id="footer-involved"
                className="font-heading text-label font-semibold tracking-[0.1em] text-gold-soft uppercase"
              >
                Get Involved
              </h2>
              <ul aria-labelledby="footer-involved" className="mt-3 flex flex-col">
                {INVOLVEMENT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="mt-6 font-heading text-label font-semibold tracking-[0.1em] text-gold-soft uppercase">
                Contact
              </h2>
              <ul className="mt-3 flex flex-col">
                <li>
                  <a href={`mailto:${ORG.email.value}`} className={linkClass}>
                    {ORG.email.value}
                  </a>
                </li>
                {confirmedSocials.length > 0 ? (
                  <li className="flex flex-wrap items-center gap-x-4">
                    {confirmedSocials.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={linkClass}
                      >
                        {social.label}
                      </a>
                    ))}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--hairline)] pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-meta text-[var(--muted-fg)]">
                {year} {ORG.name}. All rights reserved.
              </p>

              <p className="text-meta text-[var(--muted-fg)]">
                <a
                  href={CREDIT.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-md underline decoration-white/30 underline-offset-4 transition-colors duration-150 ease-out hover:text-gold-soft hover:decoration-gold-soft"
                >
                  {CREDIT.label}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
