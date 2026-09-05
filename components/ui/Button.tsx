import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Stretches the control to the width of its container. */
  block?: boolean;
};

type AnchorProps = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type NativeButtonProps = SharedProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Motion note: press feedback is a transition rather than a keyframe, because
 * a button can be triggered rapidly and the feedback must be interruptible.
 * 160ms is the top of the button budget. Under reduced motion the scale is
 * dropped and the colour change kept, so the control still acknowledges input.
 */
const BASE =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full font-heading font-semibold " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-[160ms] ease-out " +
  "active:scale-[0.97] motion-reduce:active:scale-100 " +
  "disabled:pointer-events-none disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  /* Navy on gold is 6.83:1. */
  primary: "bg-gold text-navy shadow-[0_1px_2px_rgba(11,31,58,0.16)] hover:bg-gold-soft",
  /* White on navy is 16.5:1. */
  secondary: "bg-navy text-white hover:bg-deep-blue",
  /* Inherits --btn-outline-* from the surrounding surface. */
  outline:
    "border-2 bg-transparent border-[var(--btn-outline-bd)] text-[var(--btn-outline-fg)] hover:bg-[var(--btn-outline-bg-hover)] hover:border-[var(--btn-outline-fg)]",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-body-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    block = false,
    ...rest
  } = props;

  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    block ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    const isExternal = /^https?:\/\//.test(href);
    const isHash = href.startsWith("#");

    if (isExternal) {
      return (
        <a
          {...anchorRest}
          href={href}
          className={classes}
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    if (isHash) {
      return (
        <a {...anchorRest} href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as NativeButtonProps)} className={classes}>
      {children}
    </button>
  );
}
