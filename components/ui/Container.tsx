import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Renders as this element. Defaults to a plain div. */
  as?: ElementType;
  className?: string;
  /** Narrower measure for long-form reading passages. */
  width?: "default" | "prose";
};

/**
 * Horizontal page gutter and max measure.
 * 1200px cap, with 16 / 24 / 32px padding across the breakpoints.
 */
export default function Container({
  children,
  as: Tag = "div",
  className = "",
  width = "default",
}: ContainerProps) {
  const measure = width === "prose" ? "max-w-[72ch]" : "max-w-[1200px]";
  return (
    <Tag className={`mx-auto w-full ${measure} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
