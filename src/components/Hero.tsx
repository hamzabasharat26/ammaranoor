"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { magnetic, prefersReducedMotion } from "@/lib/motion";
import HeroStack from "./HeroStack";

/**
 * The masthead. The name is the anchor — set large and animated in on load,
 * with the role and the one-line pitch stacked under it, then the pitch para,
 * the CTAs, and the proof strip pinned above the fold.
 *
 * The entrance is CSS (`.hero-in` + per-element delays in globals.css), not a
 * timeline: it is one linear sequence of fades, the compositor can run all of
 * it, and it means the home route ships no animation library at all. The
 * fixed backdrop (HeroBackdrop) sits full-viewport behind everything; the left
 * column carries a scrim so the type never competes with the detection-grid
 * motif reading through the right gutter.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mark = () => cue.current?.setAttribute("data-scrolled", "true");
    if (window.scrollY > 8) {
      mark();
      return;
    }
    window.addEventListener("scroll", mark, { passive: true, once: true });
    return () => window.removeEventListener("scroll", mark);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const els = root.current?.querySelectorAll<HTMLElement>(".hero-magnet");
    if (!els) return;
    const cleanups = Array.from(els, (el) => magnetic(el));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="hero relative flex min-h-svh flex-col justify-between px-6 md:px-10"
      style={{
        paddingTop: "var(--hero-pad-top)",
        paddingBottom: "var(--hero-pad-bottom)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-ink from-40% via-ink/80 to-transparent md:via-ink/55 md:to-60%"
      />

      {/* Aurora — a soft glow behind the name. One-shot reveal, then static
          (no loop, CLAUDE §4). Frozen under reduced motion. */}
      <div
        aria-hidden
        className="hero-aurora hero-in hero-in-0 pointer-events-none absolute -z-[4] hidden md:block"
      />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 lg:grid-cols-[7fr_5fr]">
        <div className="max-w-3xl">
          <p className="hero-in hero-in-1 label !tracking-[0.28em] text-fg-mute">
            {site.role}
          </p>

          <h1
            className="hero-name mt-4"
            style={{
              fontSize: "var(--hero-name)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            <span className="block overflow-hidden">
              <span className="display hero-name-line hero-name-line-1 block">
                Ammara
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="display hero-name-line hero-name-line-2 block">
                Noor
              </span>
            </span>
          </h1>

          <span
            aria-hidden
            className="hero-rule mt-6 block h-px w-40 origin-left bg-gradient-to-r from-a2 via-a3 to-transparent"
          />

          <p
            className="hero-in hero-in-2 mt-6 font-light tracking-tight text-fg"
            style={{ fontSize: "var(--hero-headline)", lineHeight: 1.1 }}
          >
            <span className="gradient-text">{site.headline}</span>
          </p>

          <p className="hero-in hero-in-3 mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-fg-mute">
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5 text-fg-dim">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-live" />
              </span>
              Available immediately
            </span>
          </p>

          <p
            className="hero-in hero-in-4 mt-5 max-w-[48ch] text-pretty leading-relaxed text-fg-dim"
            style={{ fontSize: "var(--hero-sub)" }}
          >
            {site.subhead}
          </p>

          <div className="hero-in hero-in-5 mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="hero-magnet group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              See the work
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href={site.links.cv}
              className="hero-magnet group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm transition-colors hover:bg-surface"
            >
              Download CV
              <Download className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <HeroStack />
      </div>

      <div className="hero-in hero-in-6 relative mx-auto w-full max-w-6xl">
        <dl
          className="proof-strip grid grid-cols-2 border-t border-line md:grid-cols-4"
          style={{
            gap: "var(--hero-strip-gap) 1.5rem",
            paddingTop: "var(--hero-strip-gap)",
          }}
        >
          {site.proofStrip.map((s) => (
            <div key={s.label}>
              <dt
                className="font-light tracking-tight tabular-nums"
                style={{ fontSize: "var(--hero-stat)" }}
              >
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-fg-dim">{s.label}</dd>
              <dd className="hero-stat-context label mt-0.5 normal-case tracking-normal">
                {s.context}
              </dd>
            </div>
          ))}
        </dl>

        <div
          ref={cue}
          aria-hidden
          data-scrolled="false"
          className="scroll-cue pointer-events-none absolute inset-x-0 -bottom-1 hidden justify-center md:flex"
        >
          <ArrowDown className="scroll-cue-mark size-4 text-fg-mute" />
        </div>
      </div>
    </section>
  );
}
