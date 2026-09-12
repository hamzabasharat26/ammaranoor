"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, Users } from "lucide-react";
import { leadership } from "@/content/site";
import type { Leadership as LeadershipItem } from "@/content/types";
import { useReveal } from "@/lib/reveal";


/**
 * Leadership & impact. The half of the record a bullet list flattens: the
 * positions held, and the one piece of evidence for each.
 *
 * Media rules follow CLAUDE §4 — a clip is muted, mounts only when the tile is
 * near the viewport AND the pointer is hover-capable, and plays on hover only.
 * Under reduced motion the poster is all that ever renders.
 */
function Media({ media }: { media: NonNullable<LeadershipItem["media"]> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (media.kind !== "clip") return;
    const el = wrap.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [media.kind]);

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink-2"
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = video.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
    >
      <Image
        src={media.poster}
        alt={media.alt}
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover"
      />
      {mount && media.webm && (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster={media.poster}
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 [&[data-playing='true']]:opacity-100"
          onPlaying={(e) => e.currentTarget.setAttribute("data-playing", "true")}
          onPause={(e) => e.currentTarget.removeAttribute("data-playing")}
        >
          <source src={media.webm} type="video/webm" />
          {media.mp4 && <source src={media.mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}

export default function Leadership() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, { selector: ".ld-reveal" });


  const withMedia = leadership.filter((l) => l.media);
  const textOnly = leadership.filter((l) => !l.media);

  return (
    <section
      ref={root}
      id="leadership"
      className="relative border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="ld-reveal mb-4 flex items-center gap-2">
          <Users className="size-4 text-accent-ink" aria-hidden />
          <p className="label">Leadership &amp; impact</p>
        </div>
        <h2 className="ld-reveal display max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)]">
          The other half of <span className="gradient-text">the record</span>
        </h2>
        <p className="ld-reveal mt-5 max-w-[62ch] text-base leading-relaxed text-fg-dim">
          Engineering is what I am hired for. These are the rooms I have had to
          run at the same time — a student branch, a council, a national
          convention.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {withMedia.map((l) => (
            <article
              key={`${l.role}-${l.org}`}
              className="ld-reveal tilt-card rounded-2xl border border-line bg-surface/50 p-4"
            >
              {l.media && <Media media={l.media} />}
              <div className="px-2 pb-1 pt-5">
                <h3 className="text-lg font-medium tracking-tight">{l.role}</h3>
                <p className="mt-1 text-sm text-fg-dim">
                  {l.org}
                  {l.period ? ` · ${l.period}` : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-mute">
                  {l.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>

        {textOnly.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {textOnly.map((l) => (
              <article
                key={`${l.role}-${l.org}`}
                className="ld-reveal tilt-card flex gap-4 rounded-2xl border border-line bg-surface/50 p-6"
              >
                <Award className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{l.role}</h3>
                  <p className="mt-1 text-sm text-fg-dim">
                    {l.org}
                    {l.period ? ` · ${l.period}` : ""}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-mute">
                    {l.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
