"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll, and anchor links that inherit its easing.
 *
 * Lenis runs on its own rAF here. It used to be driven from GSAP's ticker so
 * that ScrollTrigger updated on the same frame — there is no ScrollTrigger any
 * more (reveals moved to IntersectionObserver in src/lib/reveal.ts, which
 * costs no layout), so the extra coupling to GSAP's ticker bought nothing and
 * kept GSAP on the critical path for every route.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | null = null;

    const start = () => {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // Anchor links go through Lenis so they inherit the easing
      const onClick = (e: MouseEvent) => {
        const el = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
        if (!el) return;
        const href = el.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      };
      document.addEventListener("click", onClick);

      teardown = () => {
        document.removeEventListener("click", onClick);
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    };

    // Toggling the OS setting fires no reload, so tear Lenis down or bring it
    // back live instead of reading the preference once on mount.
    const sync = () => {
      teardown?.();
      teardown = null;
      if (!reduce.matches) start();
    };

    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  return <>{children}</>;
}
