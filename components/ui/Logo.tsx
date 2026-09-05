type LogoProps = {
  /** Height in pixels of the mark. The wordmark scales alongside it. */
  className?: string;
  /** Hides the wordmark, leaving only the mark. */
  markOnly?: boolean;
};

/**
 * The mark carries the three brand themes in abstract geometry:
 * ascending bars for Growth, a line joining two nodes for Mentorship,
 * and a grounded baseline for Leadership. Purely decorative here, because
 * the adjacent wordmark already names the organisation.
 */
export default function Logo({ className = "", markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        width="32"
        height="32"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        {/* Growth: three ascending forms */}
        <rect x="4" y="26" width="6" height="10" rx="1.5" fill="currentColor" opacity="0.55" />
        <rect x="14" y="22" width="6" height="14" rx="1.5" fill="currentColor" opacity="0.78" />
        <rect x="24" y="18" width="6" height="18" rx="1.5" fill="currentColor" />
        {/* Mentorship: a guiding path joining two points */}
        <path
          d="M7 19 L27 9"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="7" cy="19" r="2.75" fill="var(--color-gold)" />
        <circle cx="27" cy="9" r="2.75" fill="var(--color-gold)" />
      </svg>

      {markOnly ? null : (
        <span className="font-heading text-[1.0625rem] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap">
          The Jude 22 Initiative
        </span>
      )}
    </span>
  );
}
