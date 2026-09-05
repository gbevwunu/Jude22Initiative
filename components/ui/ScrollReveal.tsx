"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  /** ms before the transition starts once the element is in view. */
  delay?: number;
  /** ms the transition runs for. */
  duration?: number;
  /** px of travel for the fade-up variant. */
  offset?: number;
  /** Fraction of the element that must be visible to trigger, 0 to 1. */
  threshold?: number;
  variant?: "fade-up" | "scale-in" | "clip";
  /** When true the reveal fires a single time and never resets. */
  once?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll reveal, driven by IntersectionObserver alone. No scroll listener runs
 * at any point.
 *
 * Gate: marketing surface, seen once on the way down the page, so it earns a
 * standard reveal. It is not applied to functional interface a visitor uses
 * repeatedly.
 *
 * Reduced motion is handled in CSS rather than here: the .reveal rules drop
 * the travel, the scale and the clip while keeping a short opacity fade, so
 * the arrival still reads without anything moving. The observer still runs,
 * so content is never left hidden.
 *
 * If JavaScript never arrives, a noscript rule in the document head paints
 * every .reveal at its final state, so the page is fully readable without it.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 700,
  offset = 24,
  threshold = 0.2,
  variant = "fade-up",
  once = true,
  as: Tag = "div",
  className = "",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Guard for older browsers: show the content rather than hide it. */
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      /* Fires slightly before the element reaches the fold, so the reveal is
         already underway by the time it is properly in view. */
      { threshold, rootMargin: "0px 0px -100px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  /* Drop the compositor hint once the entrance has finished. */
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setSettled(true), delay + duration);
    return () => window.clearTimeout(timer);
  }, [visible, delay, duration]);

  /**
   * The clip variant hangs its clip-path on an inner element rather than on
   * the observed one.
   *
   * clip-path: inset(0 0 100% 0) collapses the element's visible area to
   * nothing, and Chromium then reports an intersection ratio of 0 for it, so
   * a threshold above 0 is never crossed and the reveal never fires. The
   * element stays invisible permanently. Observing an unclipped wrapper keeps
   * the measurement honest. Opacity and transform do not affect the ratio, so
   * the other two variants stay on a single element and grid children can go
   * on stretching to full height.
   */
  const isClip = variant === "clip";
  const variantClass = isClip
    ? ""
    : variant === "scale-in"
      ? "reveal-scale-in"
      : "reveal-fade-up";

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "is-visible" : ""} ${
        settled ? "is-settled" : ""
      } ${className}`}
      style={
        {
          "--reveal-duration": `${duration}ms`,
          "--reveal-delay": `${delay}ms`,
          "--reveal-offset": `${offset}px`,
          ...style,
        } as CSSProperties
      }
    >
      {isClip ? <span className="reveal-clip-inner block">{children}</span> : children}
    </Tag>
  );
}
