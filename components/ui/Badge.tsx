import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /**
   * `review` marks content the client must still confirm. It is deliberately
   * conspicuous so a placeholder can never be mistaken for finished copy.
   */
  variant?: "default" | "gold" | "review";
  className?: string;
};

const VARIANTS: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-[var(--hairline)] bg-transparent text-[var(--muted-fg)]",
  gold: "border-gold/40 bg-gold/10 text-gold-ink",
  review: "border-dashed border-gold-edge bg-gold/10 text-gold-ink",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs font-semibold tracking-[0.08em] uppercase ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
