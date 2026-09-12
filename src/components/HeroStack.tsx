"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScanLine, Boxes } from "lucide-react";

/**
 * The hero's depth object: four plates on a CSS `perspective` stage.
 *
 * Why not WebGL — CLAUDE.md §4. A canvas hero lived here until 2026-09 and was
 * cut for freezing the main thread on mount. This gets the same read (parallax
 * depth that responds to the pointer) for the cost of two custom properties.
 *
 * The pointer handler writes --rx/--ry and nothing else; the transition on
 * .hero-stack does the interpolation on the compositor, so there is no rAF
 * loop and no per-frame React work. It attaches only on a fine pointer with
 * motion allowed — touch and reduced-motion users get the static composition,
 * which is the same layout minus the tilt.
 */
export default function HeroStack() {
  const stage = useRef<HTMLDivElement>(null);
  // The stack is a large-screen composition (`hidden lg:block`). Rendering it
  // anyway on a phone still downloads the portrait, which cost Largest
  // Contentful Paint on throttled mobile for an image nobody could see.
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stack = el.querySelector<HTMLElement>(".hero-stack");
    if (!stack) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty("--ry", `${px * 16}deg`);
      stack.style.setProperty("--rx", `${-py * 12}deg`);
    };
    const onLeave = () => {
      stack.style.setProperty("--ry", "0deg");
      stack.style.setProperty("--rx", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [wide]);

  if (!wide) return null;

  return (
    <div
      ref={stage}
      className="hero-stage relative mx-auto hidden aspect-[4/5] w-full max-w-[380px] lg:block"
    >
      <div className="hero-stack">
        {/* Back plate — the measurement grid, furthest away. */}
        <div
          aria-hidden
          className="hero-plate hero-plate-grid hero-plate-float hero-plate-float-3 inset-x-6 inset-y-10"
          style={{ "--z": "-70px" } as React.CSSProperties}
        />

        {/* The portrait. */}
        <div
          className="hero-plate hero-plate-photo hero-plate-float left-0 right-14 top-8 bottom-16"
          style={{ "--z": "0px" } as React.CSSProperties}
        >
          <Image
            src="/media/ammara/portrait-square.jpg"
            alt="Ammara Noor"
            fill
            sizes="340px"
            className="object-cover"
          />
        </div>

        {/* Foreground metric card. */}
        <div
          className="hero-plate hero-plate-float hero-plate-float-2 bottom-6 left-10 right-2 px-4 py-3.5"
          style={{ "--z": "70px" } as React.CSSProperties}
        >
          <p className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent-ink">
            <ScanLine className="size-3.5" aria-hidden />
            Live inspection line
          </p>
          <p className="mt-2 text-3xl font-light tracking-tight tabular-nums">
            95<span className="text-fg-mute">%</span>
          </p>
          <p className="mt-1 text-xs text-fg-dim">
            Fabric defect accuracy, held-out test set
          </p>
        </div>

        {/* The smallest plate, closest to the reader. */}
        <div
          className="hero-plate hero-plate-float hero-plate-float-3 right-0 top-0 px-3.5 py-2.5"
          style={{ "--z": "120px" } as React.CSSProperties}
        >
          <p className="flex items-center gap-2 text-xs font-medium">
            <Boxes className="size-3.5 text-accent-ink" aria-hidden />
            YOLOv8 + PatchCore
          </p>
        </div>
      </div>
    </div>
  );
}
