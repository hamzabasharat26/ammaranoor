import Image from "next/image";
import Link from "next/link";
import { site, awards, gallery } from "@/content/site";
import Reveal from "./Reveal";


/**
 * "Proof, not promises" — the recognition and reach the hero proof strip
 * doesn't carry. Every figure below is derived from real content: the podium
 * count from `awards`, the mills from the Textile Asia outcome on the MagicQC
 * case study, the two elected positions from `leadership`. Nothing invented.
 */
const wins = awards.filter((a) => /1st|winner|runner/i.test(a.place)).length;

const STATS = [
  { value: `${wins}`, label: "National podium finishes", sub: "ICAT robotics 1st · NAIS runner-up" },
  { value: "3", label: "Mills requested evaluations", sub: "Nishat · Gul Ahmed · Sapphire" },
  { value: "2", label: "Student bodies led", sub: "IEEE WIE chair · NUTECH council" },
  { value: "1", label: "Millennium Fellowship", sub: "UN Academic Impact" },
];

export default function Achievements() {



  return (
    <Reveal selector=".ach-reveal">
      <section
        id="proof"
        className="relative border-t border-line px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="ach-reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,5vw,3.75rem)]">
              Proof, <span className="gradient-text">not promises</span>
            </h2>
            <p className="hidden max-w-[30ch] text-right text-xs leading-relaxed text-fg-mute sm:block">
              {site.reach}
            </p>
          </div>

          {/* ---- Big numbers ---- */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="ach-reveal">
                <dt className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tight tabular-nums">
                  {s.value}
                </dt>
                <dd className="mt-3 text-sm text-fg-dim">{s.label}</dd>
                <dd className="label mt-1 normal-case tracking-normal text-fg-mute">
                  {s.sub}
                </dd>
              </div>
            ))}
          </dl>

          {/* ---- Awards ---- */}
          <p className="ach-reveal label mt-14 mb-4">Awards</p>
          <ul className="divide-y divide-line">
            {awards.map((a) => {
              const slug = a.projectSlug;
              return (
                <li
                  key={`${a.title}-${a.event}`}
                  className="ach-reveal grid gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <span className="text-sm font-medium tracking-tight text-a2 md:col-span-2">
                    {a.place}
                  </span>
                  <span className="text-base text-fg md:col-span-6">
                    {slug ? (
                      <Link
                        href={`/work/${slug}`}
                        className="border-b border-line-strong pb-0.5 transition-colors hover:border-a2 hover:text-a2"
                      >
                        {a.title}
                      </Link>
                    ) : (
                      a.title
                    )}
                  </span>
                  <span className="text-sm text-fg-mute md:col-span-4 md:text-right">
                    {a.event}
                    {a.year ? ` · ${a.year}` : ""}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* ---- From the field — real events, no stock (CLAUDE §7).
                  Masonry columns so each photo keeps its own aspect ratio and
                  nothing is cropped by a forced box. ---- */}
          {gallery.length > 0 && (
            <>
              <p className="ach-reveal label mt-16 mb-4">From the field</p>
              <div className="gap-3 [column-fill:balance] sm:columns-2 lg:columns-3">
                {gallery.map((p) => (
                  <figure
                    key={p.src}
                    className="ach-reveal group relative mb-3 break-inside-avoid overflow-hidden rounded-xl border border-line bg-surface"
                  >
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: p.aspect ?? "3 / 2" }}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent"
                    />
                    {p.tag && (
                      <figcaption className="absolute inset-x-3 bottom-2.5 truncate text-[0.6875rem] font-medium text-white">
                        {p.tag}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Reveal>
  );
}
