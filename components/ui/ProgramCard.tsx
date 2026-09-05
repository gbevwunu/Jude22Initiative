import Link from "next/link";
import type { Program } from "@/lib/constants";
import Badge from "./Badge";

type ProgramCardProps = {
  program: Program;
  /** Heading rank, so the card fits the page outline it is dropped into. */
  as?: "h3" | "h4";
};

export default function ProgramCard({ program, as: Heading = "h3" }: ProgramCardProps) {
  return (
    <article
      id={program.id}
      className="flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-white p-7 lg:p-9"
    >
      <Badge variant="gold">{program.eyebrow}</Badge>

      <Heading className="mt-5 font-heading text-2xl font-semibold text-navy lg:text-[1.75rem]">
        {program.title}
      </Heading>

      <p className="mt-3 text-[var(--muted-fg)]">{program.blurb}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {program.points.map((point) => (
          <li key={point} className="flex gap-3 text-[0.9375rem] text-grey-900">
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              aria-hidden="true"
              focusable="false"
              className="mt-0.5 h-5 w-5 shrink-0"
            >
              <circle cx="10" cy="10" r="9" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
              <path
                d="M6 10.5 L9 13.5 L14.5 7"
                fill="none"
                stroke="var(--color-gold-ink)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link
          href={program.ctaHref}
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-md font-heading font-semibold text-navy transition-colors duration-150 ease-out hover:text-blue-accent"
        >
          {program.ctaLabel}
          {/* Travels a few pixels on hover. Gated to fine pointers by the
              hover variant, and dropped entirely under reduced motion. */}
          <svg
            viewBox="0 0 20 20"
            width="18"
            height="18"
            aria-hidden="true"
            focusable="false"
            className="h-[18px] w-[18px] transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            <path
              d="M4 10 H15 M10.5 5.5 L15 10 L10.5 14.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
