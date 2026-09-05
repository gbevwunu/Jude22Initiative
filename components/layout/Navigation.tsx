"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

/**
 * Motion notes
 *
 * Mobile panel: occasional tier, so it earns a standard animation. Purpose is
 * spatial consistency, it leaves along the same edge it entered by. Built as a
 * CSS transition rather than keyframes because the trigger can be tapped
 * twice in a second and a transition retargets from wherever it is. Curve is
 * --ease-drawer, 280ms in and 220ms out, inside the 200-500ms drawer budget.
 *
 * Nav links: seen tens of times a day, so they get colour only, no transform.
 *
 * Header on first paint: a single fade, no movement, so it does not fight the
 * hero headline that follows it in the entrance sequence.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* Route change closes the panel. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Header elevation without a scroll listener: a sentinel at the very top of
     the document reports when it leaves the viewport. */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry?.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Escape to close, returning focus to the trigger that opened the panel. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      /* Focus trap. The panel is a modal dialog, so Tab must cycle inside it. */
      const panel = panelRef.current;
      if (!panel) return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* Scroll lock while the modal panel is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Move focus into the panel once it opens. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const firstLink = panel.querySelector<HTMLElement>(FOCUSABLE);
    firstLink?.focus();
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={`surface-dark header-enter sticky top-0 z-50 bg-navy text-white ${
          scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.14),0_8px_24px_rgba(11,31,58,0.28)]" : ""
        }`}
      >
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            <Link
              href="/"
              className="-mx-2 flex min-h-[44px] items-center rounded-md px-2 text-white transition-colors duration-150 ease-out hover:text-gold-soft"
              aria-label={`${"The Jude 22 Initiative"}, home`}
            >
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex min-h-[44px] items-center rounded-md px-3.5 font-heading text-[0.9375rem] font-medium transition-colors duration-150 ease-out hover:text-gold-soft ${
                          active ? "text-gold-soft" : "text-white/85"
                        }`}
                      >
                        {item.label}
                        {/* Shape, not only colour, marks the current page. */}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3.5 bottom-2.5 h-0.5 rounded-full bg-gold ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <Button href="/get-involved" variant="primary" size="md">
                Become a Mentor
              </Button>
            </div>

            {/* Mobile trigger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={panelId}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors duration-150 ease-out hover:text-gold-soft lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
                focusable="false"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <path d="M5 5 L19 19" />
                    <path d="M19 5 L5 19" />
                  </>
                ) : (
                  <>
                    <path d="M3.5 7.5 H20.5" />
                    <path d="M3.5 12 H20.5" />
                    <path d="M3.5 16.5 H20.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile panel. Kept mounted and marked inert when closed, so the exit
          transition can play and assistive tech still ignores it. The wrapper
          clips the offscreen panel so it can never create horizontal scroll. */}
      <div
        className="nav-overlay fixed inset-0 z-[60] overflow-hidden lg:hidden"
        data-state={open ? "open" : "closed"}
        inert={!open}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={`nav-backdrop absolute inset-0 bg-navy/70 ${open ? "opacity-100" : "opacity-0"}`}
        />

        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`nav-panel surface-dark absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-navy text-white shadow-[0_0_48px_rgba(0,0,0,0.4)] ${
            open ? "is-open" : ""
          }`}
        >
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-5">
            <Logo markOnly className="text-white" />
            <button
              type="button"
              onClick={() => {
                close();
                triggerRef.current?.focus();
              }}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors duration-150 ease-out hover:text-gold-soft"
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
                focusable="false"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 5 L19 19" />
                <path d="M19 5 L5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-2 pb-8">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[52px] items-center gap-3 rounded-lg px-3 font-heading text-lg font-medium transition-colors duration-150 ease-out ${
                        active ? "bg-white/8 text-gold-soft" : "text-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-5 w-0.5 rounded-full bg-gold ${active ? "opacity-100" : "opacity-0"}`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Button href="/get-involved" variant="primary" size="lg" block>
                Become a Mentor
              </Button>
              <Button href="/contact" variant="outline" size="lg" block>
                Contact us
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
