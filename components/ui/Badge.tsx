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
  /* Colours come from the surface, so a gold badge stays legible on navy
     as well as on white. See the --badge-* tokens in globals.css. */
  gold: "border-[var(--badge-bd)] bg-[var(--badge-bg)] text-[var(--badge-fg)]",
  review:
    "border-dashed border-[var(--badge-review-bd)] bg-[var(--badge-bg)] text-[var(--badge-fg)]",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-label font-semibold tracking-[0.08em] uppercase ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
