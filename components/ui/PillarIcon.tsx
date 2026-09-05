import type { PillarIconKey } from "@/lib/constants";

type PillarIconProps = {
  name: PillarIconKey;
  className?: string;
};

/**
 * Abstract geometric marks for the five pillars, drawn in the same language
 * as the logo: anchoring forms for leadership, joined points for mentorship,
 * ascending forms for growth. Gold picks out the idea inside each mark.
 *
 * Decorative throughout. Each card states its pillar in a heading, so the
 * marks are hidden from assistive technology rather than described twice.
 */
export default function PillarIcon({ name, className = "" }: PillarIconProps) {
  const common = {
    viewBox: "0 0 44 44",
    width: 44,
    height: 44,
    fill: "none",
    "aria-hidden": true as const,
    focusable: "false" as const,
    className: `h-11 w-11 ${className}`,
  };

  switch (name) {
    /* Ownership: a form held squarely on its own base. */
    case "responsibility":
      return (
        <svg {...common}>
          <rect
            x="7"
            y="7"
            width="30"
            height="26"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M7 37 H37" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="22" cy="20" r="5.5" fill="var(--color-gold)" />
        </svg>
      );

    /* What holds at the core when the outer layers are under pressure. */
    case "character":
      return (
        <svg {...common}>
          <rect
            x="6.5"
            y="6.5"
            width="31"
            height="31"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="14"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
          <rect x="19" y="19" width="6" height="6" rx="1" fill="var(--color-gold)" />
        </svg>
      );

    /* Widening capacity: three forms of increasing reach. */
    case "capacity":
      return (
        <svg {...common}>
          <path d="M22 36 V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M11 27 A11 11 0 0 1 33 27"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M6 20 A16 16 0 0 1 38 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="22" cy="31" r="3" fill="var(--color-gold)" />
        </svg>
      );

    /* Two points joined by a guiding path. The logo's connection motif. */
    case "mentorship":
      return (
        <svg {...common}>
          <path
            d="M12 31 L32 13"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="31" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="13" r="5" fill="var(--color-gold)" />
        </svg>
      );

    /* A circle that carries weight together. */
    case "relationships":
      return (
        <svg {...common}>
          <path
            d="M22 9 L34 31 H10 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="9" r="4" fill="var(--color-gold)" />
          <circle cx="34" cy="31" r="4" fill="currentColor" />
          <circle cx="10" cy="31" r="4" fill="currentColor" />
        </svg>
      );
  }
}
