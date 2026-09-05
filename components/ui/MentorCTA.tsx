import Button from "./Button";

type MentorCTAProps = {
  /** Overrides the default heading, so the block can sit on several pages. */
  title?: string;
  body?: string;
  className?: string;
};

/**
 * The recurring "become a mentor" appeal. Sits on the growth gradient, which
 * is the surface the brand reserves for asking for something.
 */
export default function MentorCTA({
  title = "Someone is looking for the road you have already walked",
  body = "A few hours a month, spent with a young person moving toward the field you know, is the shortest distance between their potential and their practice.",
  className = "",
}: MentorCTAProps) {
  return (
    <div
      className={`surface-dark bg-grad-growth relative overflow-hidden rounded-3xl px-7 py-12 text-white sm:px-10 lg:px-14 lg:py-16 ${className}`}
    >
      {/* Growth: an ascending stepped form, held back so the copy stays first. */}
      <svg
        viewBox="0 0 240 160"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-60 opacity-[0.18]"
      >
        <rect x="8" y="104" width="40" height="56" rx="4" fill="var(--color-white)" />
        <rect x="60" y="76" width="40" height="84" rx="4" fill="var(--color-white)" />
        <rect x="112" y="48" width="40" height="112" rx="4" fill="var(--color-white)" />
        <rect x="164" y="16" width="40" height="144" rx="4" fill="var(--color-white)" />
      </svg>

      <div className="relative max-w-[46rem]">
        <h2 className="text-section font-heading text-balance">{title}</h2>
        <p className="mt-5 text-lede text-white/85">{body}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/get-involved#mentor" variant="primary" size="lg">
            Apply to mentor
          </Button>
          <Button href="/get-involved#give" variant="outline" size="lg">
            Give to the work
          </Button>
        </div>
      </div>
    </div>
  );
}
