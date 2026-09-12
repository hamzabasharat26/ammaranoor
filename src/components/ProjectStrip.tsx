import Image from "next/image";
import Link from "next/link";

export type StripItem = {
  /** Unique key for the list. */
  id: string;
  title: string;
  poster: string;
  /** Short chip: a project domain, or what the frame shows. */
  tag: string;
  /** `/work/<slug>` for a case study, `/#proof` for field photography. */
  href: string;
};

/**
 * Two horizontal auto-scrolling lanes of the work, running in opposite
 * directions: the case studies on top, the individual screens and field frames
 * underneath.
 *
 * Pure CSS marquee (see `.marquee` in globals.css) — the list is rendered twice
 * inside one animated track so the -50% loop is seamless, it pauses on hover
 * and freezes under reduced motion. Server component: no JS ships for it.
 */
function Card({ it, dup }: { it: StripItem; dup: boolean }) {
  return (
    <Link
      href={it.href}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className="group relative block w-[240px] shrink-0 overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong sm:w-[280px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={it.poster}
          alt=""
          fill
          sizes="280px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized={it.poster.endsWith(".svg")}
        />
        {/* The label sits on the image, so both the scrim and the type are
            fixed colours — `--color-ink` is paper in the light theme and this
            caption would vanish into it. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
        <span className="truncate text-sm font-medium text-white">{it.title}</span>
        <span className="shrink-0 rounded-full border border-white/30 bg-black/65 px-2 py-0.5 text-[0.5625rem] uppercase tracking-wider text-white">
          {it.tag}
        </span>
      </div>
    </Link>
  );
}

function Lane({ items, reverse }: { items: StripItem[]; reverse?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className="marquee-track relative flex overflow-hidden">
      <div className={`marquee gap-4 pr-4 ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((it) => (
          <Card key={`a-${it.id}`} it={it} dup={false} />
        ))}
        {items.map((it) => (
          <Card key={`b-${it.id}`} it={it} dup />
        ))}
      </div>
    </div>
  );
}

export default function ProjectStrip({
  top,
  bottom,
}: {
  top: StripItem[];
  bottom: StripItem[];
}) {
  return (
    <section
      aria-label="Selected work"
      className="relative overflow-hidden border-t border-line py-8"
    >
      <p className="label mx-auto mb-5 w-full max-w-6xl px-6 md:px-10">
        Selected work — shipped, deployed, measured
      </p>
      <div className="space-y-4">
        <Lane items={top} />
        <Lane items={bottom} reverse />
      </div>
    </section>
  );
}
