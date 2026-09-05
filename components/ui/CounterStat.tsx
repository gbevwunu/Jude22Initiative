"use client";

import { useEffect, useRef, useState } from "react";

type CounterStatProps = {
  value: number;
  label: string;
  suffix?: string;
  /** ms the count runs for. Marketing motion, so it may exceed the UI cap. */
  duration?: number;
  needsReview?: boolean;
};

/** Ease-out cubic. Fast first, settling at the end, like every other entrance. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Number ticker.
 *
 * Gate: marketing surface, seen once on the way down the page. Purpose is
 * state indication, the figure counting up draws the eye to a number that
 * would otherwise sit inert.
 *
 * Digits are set in tabular numerals so the value does not jitter in width as
 * it climbs, which is what makes a ticker read as one number changing rather
 * than several numbers replacing each other.
 *
 * Accessibility: the animating figure is hidden from assistive technology and
 * the settled value is exposed once as text, so a screen reader announces
 * "1,200 students reached" rather than every intermediate frame.
 */
export default function CounterStat({
  value,
  label,
  suffix = "",
  duration = 1400,
  needsReview = false,
}: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Reduced motion, or no observer support: show the settled figure. */
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      setDone(true);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const run = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        frame = requestAnimationFrame(run);
      } else {
        setDone(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            frame = requestAnimationFrame(run);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const formatted = new Intl.NumberFormat("en-US").format(done ? value : display);
  const settled = new Intl.NumberFormat("en-US").format(value);

  return (
    <div ref={ref} className="text-center">
      <div
        aria-hidden="true"
        className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-bold tracking-[-0.02em] text-navy tabular-nums"
      >
        {formatted}
        {suffix}
      </div>
      {/* The one announced value, replacing the animating digits above. */}
      <span className="sr-only">
        {settled}
        {suffix} {label}
      </span>
      <div aria-hidden="true" className="mt-3 text-body-sm text-[var(--muted-fg)]">
        {label}
      </div>
      {needsReview ? (
        <div aria-hidden="true" className="mt-2 text-label font-semibold text-gold-ink">
          {"{REVIEW}"}
        </div>
      ) : null}
    </div>
  );
}
