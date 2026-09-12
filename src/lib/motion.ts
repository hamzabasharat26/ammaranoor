"use client";

/* ============================================================
   Shared motion vocabulary — no animation library.

   This file used to wrap GSAP + ScrollTrigger. Both are gone:

   - Scroll reveals moved to src/lib/reveal.ts (IntersectionObserver + a CSS
     transition). ScrollTrigger measured every trigger element on init, which
     a Lighthouse trace attributed 2.4s of styleLayout to — the largest single
     cost on the page.
   - The hero's entrance is now CSS keyframes with per-element delays
     (`.hero-in-*` in globals.css), which the compositor runs without any
     main-thread work at all.

   What is left is the one effect CSS genuinely cannot do: a magnetic pull
   toward the pointer. It is transform-only and the caller must gate it on
   reduced motion — a media query cannot reach an inline transform.
   ============================================================ */

/** True when the visitor has asked for less motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Magnetic pull: the element eases toward the pointer while it is within
 * `radius` px of it, and springs back on leave. Transform only, written once
 * per pointermove and interpolated by a CSS transition.
 *
 * Returns a cleanup function. Do not call this under reduced motion.
 */
export function magnetic(el: HTMLElement, radius = 90, strength = 0.32) {
  // One rect read per frame at most, cached between moves — reading it inside
  // the raw pointermove handler is what turns this into layout thrash.
  let rect: DOMRect | null = null;
  let queued = false;
  let last: PointerEvent | null = null;

  const apply = () => {
    queued = false;
    const e = last;
    if (!e) return;
    rect ??= el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const out = Math.hypot(dx, dy) > radius + Math.max(rect.width, rect.height) / 2;
    el.style.transform = out
      ? "translate3d(0,0,0)"
      : `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const move = (e: PointerEvent) => {
    last = e;
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };
  const reset = () => {
    rect = null;
    el.style.transform = "translate3d(0,0,0)";
  };
  const invalidate = () => {
    rect = null;
  };

  el.classList.add("magnetic");
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("scroll", invalidate, { passive: true });
  window.addEventListener("resize", invalidate);
  el.addEventListener("pointerleave", reset);

  return () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("scroll", invalidate);
    window.removeEventListener("resize", invalidate);
    el.removeEventListener("pointerleave", reset);
    el.classList.remove("magnetic");
    el.style.transform = "";
  };
}
