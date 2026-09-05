import type { ReactNode } from "react";
import Badge from "./Badge";

type SectionHeaderProps = {
  /** Small label above the title. */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  /** Heading level, so pages keep a logical outline with no skipped ranks. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "start",
  as: Heading = "h2",
  className = "",
  id,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow ? (
        <Badge variant="gold" className="mb-5">
          {eyebrow}
        </Badge>
      ) : null}

      <Heading
        id={id}
        className={`text-section font-heading ${centered ? "rule-anchor rule-anchor-center" : "rule-anchor"}`}
      >
        {title}
      </Heading>

      {lede ? (
        <p className="mt-6 max-w-[62ch] text-lede text-[var(--muted-fg)]">{lede}</p>
      ) : null}
    </div>
  );
}
