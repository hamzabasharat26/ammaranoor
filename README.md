# Ammara Noor — portfolio

The portfolio of **Ammara Noor** — AI / ML Engineer (computer vision, LLM & RAG
systems, production ML), Lahore, Pakistan.

## What this is

A content-driven portfolio built for one reader: a technical recruiter or hiring
manager deciding, in about thirty seconds, whether this person has shipped
anything real. Every project, metric and claim traces back to a source CV or to
a public repository — nothing on the site is invented copy.

- Six case studies, each with at least one measured outcome **and** a stated
  limitation. The limitations are the point: a portfolio with no failure modes
  reads as inexperience.
- A leadership section, because the IEEE WIE chair and student-council roles are
  half the record and a bullet list flattens them.
- A "Pixel" chat widget — a canned, pattern-matched Q&A knowledge base. No LLM in
  the loop, so nothing it says can be hallucinated; every answer traces to
  `src/content/`.
- An ATS-parseable one-page CV, rendered to PDF from the same data the site uses.
- Light-first design with a full dark counterpart, WCAG 2.1 AA throughout.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components, React Compiler) |
| Language | TypeScript, strict mode |
| UI | React 19, Tailwind CSS v4 (`@theme` tokens) |
| Motion | CSS animations + IntersectionObserver (`src/lib/reveal.ts`), [Lenis](https://lenis.darkroom.engineering) for smooth scroll on pointer devices |
| Icons | lucide-react |
| Media | ffmpeg + sharp, via `scripts/build-media-ammara.mjs` |
| Hosting | Vercel |

There is **no animation library**. GSAP and ScrollTrigger were removed in 2026-09:
ScrollTrigger measures every trigger element on init, which a Lighthouse trace
attributed 2.4s of style/layout to. Reveals are an IntersectionObserver plus a CSS
transition; the hero entrance is CSS keyframes. That removed ~45 KB gz from every
route and took the desktop performance score from 67 to 92.

There is no WebGL either — see `CLAUDE.md` §4.

## Layout

```
src/
  app/            routes: /, /work, /work/[slug], /cv, /cv/print, api/agent (off)
  components/     one component per section; Server Components by default
  content/        THE source of truth — site.ts, projects.ts, frames.ts, cv.ts, agent.ts
  lib/            reveal.ts (scroll reveals), motion.ts (magnetic), audio.ts
public/media/     every shipping asset, built by the scripts below
docs/drive/       private source material (gitignored) — CVs, raw photos, video
```

`src/content/` is the single source of truth. No copy, metric, project title or
link is hardcoded in a component. To change the site, change the data.

## Commands

```bash
npm run dev              # dev server
npm run build            # production build
npm run lint             # eslint

node scripts/build-media-ammara.mjs   # docs/drive/ammara → public/media/ammara
node scripts/build-cv.mjs             # /cv/print → public/media/Ammara_Noor_CV.pdf
```

`build-cv.mjs` needs a server running (`npm run dev` first). It fails the run if
the CV spills onto a second page.

`build-media-ammara.mjs` needs `ffmpeg` and `ffprobe` on PATH. Every video it
emits is muted (`-an`) and every image ships as both `.jpg` and `.webp`.

## The CV

`public/media/Ammara_Noor_CV.pdf` is not authored by hand. It is printed from
`/cv/print`, which renders `src/content/cv.ts`. Edit the content file, re-run the
script, and the download link is current — there is no second copy to fall out of
date. The print route is deliberately plain (one column, no tables, no images,
standard headings, ASCII punctuation, ligatures off) so an applicant tracking
system can parse it.

## Deploying

Vercel, zero config. Set one environment variable so metadata, the sitemap and
robots.txt resolve to the real origin:

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

Without it the site falls back to `https://ammara-noor.vercel.app`.

## Licence

Personal portfolio — the content, case-study material and photography are Ammara
Noor's own. The code is not licensed for reuse.
