import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/content/projects";
import { frames } from "@/content/frames";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import Projects, { type ProjectCard } from "@/components/Projects";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: `Every shipped project by ${site.name} — ${site.roleLong}.`,
  alternates: { canonical: "/work" },
};

const cards: ProjectCard[] = projects.map(
  ({ slug, title, kicker, year, role, org, status, domains, problem, outcome, stack, links, media, featured, confidential }) => ({
    slug, title, kicker, year, role, org, status, domains, problem, outcome, stack, links, media, featured, confidential,
  })
);

export default function WorkIndex() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <Nav />
      <main className="pt-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Home
          </Link>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3.25rem)]">
            Every shipped project
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-dim">
            {projects.length} systems — computer vision, edge inference and LLM
            agents — from dataset to a monitored deployment.
          </p>
        </div>
        <Projects projects={cards} showAll heading={false} />

        {/* Every frame from the home-page ticker, in full. A screen that
            scrolls past in a marquee is not findable afterwards unless it also
            lives somewhere still — this is that somewhere. */}
        <Reveal selector=".fr-reveal">
          <section
            id="frames"
            className="border-t border-line px-6 py-20 md:px-10 md:py-24"
          >
            <div className="mx-auto w-full max-w-6xl">
              <p className="fr-reveal label">Every screen, in full</p>
              <h2 className="fr-reveal display mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
                {frames.length} frames from the work
              </h2>
              <p className="fr-reveal mt-3 max-w-2xl text-sm leading-relaxed text-fg-dim">
                The same frames that move across the home page, held still.
                Every one is my own capture, and each links to the case study it
                belongs to.
              </p>

              <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {frames.map((f) => (
                  <li key={f.id} className="fr-reveal">
                    <Link href={`/work/${f.slug}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                        <Image
                          src={f.src}
                          alt={f.caption}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          unoptimized={f.src.endsWith(".svg")}
                        />
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-3">
                        <h3 className="text-sm font-medium text-fg">
                          {f.title}
                        </h3>
                        <span className="shrink-0 text-[0.625rem] uppercase tracking-wider text-fg-mute">
                          {f.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-dim">
                        {f.caption}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </main>
    </>
  );
}
