"use client";

import { useEffect, type RefObject } from "react";

/* ============================================================
   Scroll reveals, without ScrollTrigger.

   WHY: GSAP ScrollTrigger measures every trigger element on init and again on
   every refresh. With seven sections' worth of triggers that showed up as 2.4s
   of styleLayout in a Lighthouse trace — the single largest cost on the page,
   larger than all script evaluation combined.

   An IntersectionObserver does the same job with no layout reads at all: the
   browser computes intersection off the main thread and hands us a callback.
   The animation itself is a CSS transition on opacity and transform, so it
   runs on the compositor.

   GSAP is still used — for the hero's one-shot entrance timeline, which is
   choreography rather than a reveal. ScrollTrigger is gone entirely.
   ============================================================ */

type Options = {
  /** CSS selector for the elements to reveal, scoped to `root`. */
  selector: string;
  /** Seconds between each element's reveal. */
  stagger?: number;
  /** How far into the viewport an element must come. Negative insets it. */
  rootMargin?: string;
  /** Re-run when these change — for lists that re-render, like a filtered grid. */
  deps?: unknown[];
};

export function useReveal(
  root: RefObject<HTMLElement | null>,
  { selector, stagger = 0.07, rootMargin = "0px 0px -12% 0px", deps = [] }: Options
) {
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const items = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    // Reduced motion, or a browser without IO: show everything, immediately.
    // The class is what hides the element, so adding it is the only way
    // content can get stuck invisible — never add it on this path.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      for (const el of items) el.classList.add("rv-in");
      return;
    }

    for (const el of items) el.classList.add("rv");

    // Elements already on screen at mount reveal together, in order, rather
    // than waiting for a scroll that may never come.
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting);
        hits.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${i * stagger}s`;
          el.classList.add("rv-in");
          io.unobserve(el);
        });
      },
      { rootMargin, threshold: 0.01 }
    );
    for (const el of items) io.observe(el);

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
