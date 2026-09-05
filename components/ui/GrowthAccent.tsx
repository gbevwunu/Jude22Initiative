type GrowthAccentProps = {
  className?: string;
};

/**
 * The hero's accent form. Ascending stepped blocks in the growth gradient,
 * crossed by the mentorship path joining two points. Decorative, so it is
 * hidden from assistive technology.
 */
export default function GrowthAccent({ className = "" }: GrowthAccentProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="j22-growth" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#143B6B" />
          <stop offset="100%" stopColor="#2E6FB8" />
        </linearGradient>
      </defs>

      {/* Growth: an ascending stepped form */}
      <rect x="16" y="212" width="56" height="92" rx="6" fill="url(#j22-growth)" />
      <rect x="88" y="164" width="56" height="140" rx="6" fill="url(#j22-growth)" />
      <rect x="160" y="112" width="56" height="192" rx="6" fill="url(#j22-growth)" />
      <rect x="232" y="52" width="56" height="252" rx="6" fill="url(#j22-growth)" />

      {/* Leadership: the anchoring rule the whole form stands on */}
      <path
        d="M8 304 H312"
        stroke="var(--color-gold)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Mentorship: a path joining two points across the ascent */}
      <path
        d="M44 186 L260 26"
        stroke="var(--color-gold)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="44" cy="186" r="9" fill="var(--color-gold)" />
      <circle cx="260" cy="26" r="9" fill="var(--color-gold)" />
    </svg>
  );
}
