# CLAUDE.md — Ammara Noor's portfolio

Standing instructions for every session in this repo. Read before acting.
When a request conflicts with this file, say so and ask; do not silently override it.

---

## 1. What this site is

A portfolio for **Ammara Noor, AI / ML Engineer** (Islamabad, Pakistan) — computer
vision, LLM & RAG systems, production ML. She is available immediately for
full-time roles.

One audience, one job:

| Audience | Arrives via | Needs to believe in 30 seconds |
|---|---|---|
| Technical recruiter / hiring manager | LinkedIn, CV link, referral | She has taken a model from raw data to something running on a production line, and can say where it breaks |

**The spine is production AI/ML engineering.** The evidence is the shipped project
work — the case studies, the numbers, the honest limitations — never the site's
chrome. If a change makes the site read as "web studio" or "motion designer", it is
wrong regardless of how good it looks.

The leadership section is the differentiator, not the pitch. It goes after the work.

---

## 2. Content law

- `src/content/` is the **single source of truth**. No copy, metric, project title
  or link is ever hardcoded in a component. If you need new copy, add a field to
  the data and render it.
- Every number on the site traces to one of the three source CVs in
  `docs/drive/ammara/` or to the public repo
  `github.com/ammaran620-de/industrial-anomaly-detection-mlops`. **Never invent a
  metric, a client name, a date or an outcome.** If a slot needs a number that does
  not exist, leave the slot out and say what is missing.
- The verified set, in full: 95% defect accuracy on a live line · ~1,600 images
  collected on-site · 3 defect classes + PatchCore for unseen ones · 99.56% AUROC
  on MVTec AD carpet · 87/89 defects caught · 26/28 good pieces passed · 0.9775
  precision/recall/F1 · 535 ms/image CPU against a 33 ms budget · 3 mills requested
  evaluations after Textile Asia · 1st ICAT 2025 · runner-up NAIS 2025 · CGPA 3.44.
- `src/content/testimonials.ts` is empty until Ammara pastes real LinkedIn
  recommendations. **Never write a testimonial.** Never generate a placeholder
  quote, even marked as fake — placeholder quotes get shipped by accident. While
  the array is empty the section does not render.
- Fields marked `DRAFT:` are Ammara's to fill. Do not guess at them.
- No lorem ipsum, ever. If real content is missing, render the empty state.
- **Media provenance.** Only publish what is hers. The previous owner's assets
  were deleted from this repo in 2026-09 rather than re-captioned; borrowed
  footage under a new name is the single fastest way to lose an interview. Her
  own product screens, field photography and video were confirmed by her and
  ingested on 2026-09-12. Where a project still has no capture of its own, ship
  an authored diagram under `public/media/diagrams/` and label it a diagram on
  the card itself.
- **Three things are deliberately held back, and stay held back.** (1) The two
  QGroundControl mission plans from the NESCOM programme show GPS waypoints over
  a real, identifiable site. (2) The MagicQC desktop screenshot's left rail is a
  row of third-party brand logos configured as sample clients, so the frame is
  cropped to the measurement panel in `build-media-ammara.mjs`. (3) The
  dynamic-slot-allocation slide carries a capacity projection that is the product
  team's, not a result she measured — its caption says so, and that caption is
  not decoration.
- **RallyLens is the one project not in any CV.** It was added from her own build
  screenshots at her request. Its copy claims nothing that is not legible on
  screen. Either add a CV line for it or remove it — the site and the CV must not
  disagree.

---

## 3. Positioning rules for copy

- Lead with the **pain**, not the model. "Fabric defects are caught by eye" beats
  "YOLOv8 + PatchCore anomaly detection pipeline".
- Every project card shows at least one **measured outcome** above the fold of that
  card, and every case study states where the system breaks.
- Write in first person, plain, declarative. No "passionate about", no
  "leveraging", no "cutting-edge", no "innovative solutions".
- British spelling in prose (it matches her CVs); the ATS CV is the exception —
  see §7.
- The word "AI" appears in the role, not in every sentence.

---

## 4. Motion budget — non-negotiable

There is **no animation library and no WebGL**.

- Scroll reveals are `src/lib/reveal.ts` — IntersectionObserver plus a CSS
  transition. GSAP + ScrollTrigger were removed 2026-09: ScrollTrigger measures
  every trigger on init, which a Lighthouse trace charged 2.4s of styleLayout.
  Removing it took desktop performance 67 → 92. Do not bring it back.
- The hero entrance is CSS keyframes (`.hero-in-*` in `globals.css`). The hero's
  3D depth is CSS `perspective` + `translateZ`, driven by two custom properties
  the pointer handler writes — no rAF loop.
- A 52k-point Three.js cloud lived here until 2026-09 and was cut: it froze the
  main thread for 150-300 ms on mount. Do not bring a canvas hero back without a
  profile that justifies it.
- **First contentful paint is static DOM.** Never gate the LCP element behind an
  opacity animation — it cost 3.7s of render delay on throttled mobile when the
  hero subhead faded in. Animate transform, leave opacity alone.
- Always-on animation is deliberately small: two CSS marquees (paused on hover and
  when off-screen), the hero scan sweep, two pulsing outline boxes. Every animated
  layer carries `will-change` so the fixed backdrop does not re-rasterise.
- No `backdrop-filter` except on the nav pill and the agent panel. It was the
  second-largest style cost on the page.
- Total JS shipped to the home route: **at or under 220 KB gzipped** (currently
  ~203, of which ~151 is React + Next). If a change pushes past it, lazy-mount a
  component — see `AgentMount`, `DecorMount`, `ViewportGate`.
- Target 60fps scroll on an integrated GPU. Measure with a Lighthouse run or a
  DevTools trace; do not assume.

---

## 5. Accessibility floor (WCAG 2.1 AA) — currently 100/100, keep it there

- Body text ≥ 4.5:1 against its **actual painted** background, in both themes.
  `node scripts/audit-contrast.mjs` checks every route in both themes; the trap it
  works around is that `color-mix()` computes to `oklab(...)`, which a naive
  parser reads as near-black and reports the whole nav as failing.
- Any scrim over photography uses `black/NN`, never `--color-ink` — ink is paper
  now, and white captions on a white scrim is how that bug presents.
- Every interactive element has a visible `:focus-visible` state. The hero
  backdrop and the cursor layer are `aria-hidden` and not focusable.
- One `h1` per page, no level skips. All project media has meaningful `alt`
  describing what the system is doing, not "screenshot".
- The FAQ is a real disclosure widget (`details`/`summary`).
- Colour is never the only carrier of meaning.

---

## 6. Stack and conventions

- Next.js App Router, TypeScript strict, Tailwind v4.
- **Server Components by default.** `'use client'` only for state, refs or
  effects: the nav, the project grid (filter), the leadership clips, the hero, the
  agent, the cursor. A section that only needs a scroll reveal is a Server
  Component wrapped in `<Reveal>` — five sections were converted back that way and
  it was worth ~200 ms of blocking time.
- Files: `PascalCase.tsx` for components, `kebab-case.ts` for everything else.
- No new dependency without saying what it costs in gzipped bundle size and why the
  platform cannot do it.

---

## 7. The ATS CV

`public/media/Ammara_Noor_CV.pdf` is generated, never hand-edited. `/cv/print`
renders `src/content/cv.ts`; `scripts/build-cv.mjs` prints it and **fails the run
if it spills to a second page**.

Rules baked into that route — do not "improve" past them: one column, no tables,
no images, no icons, black on white, standard headings, dates as `Feb 2026 - Jun
2026`, ASCII punctuation only, ligatures off (the `fl` ligature turns "MLflow"
into a glyph a keyword matcher cannot read).

---

## 8. Forbidden

- Any media, project or metric belonging to another engineer.
- Invented projects, invented testimonials, invented certifications. Her CVs list
  no certifications — the section does not exist, and adding one would be fiction.
- Claiming capabilities the CVs do not state. **MagicQC and the fabric defect
  detector are two different systems** — MagicQC is the AI-based automated
  garment size measurement station, the defect detector is the YOLOv8 + PatchCore
  mill-floor system. The 95% / ~1,600-image figures belong to the defect
  detector; MagicQC has no published accuracy number and must not be given one.
- Metrics about the website (bundle size, frame budget) presented as career proof.
- `localStorage` for anything that matters. Theme preference only.

---

## 9. Definition of done for any section

1. Renders from `src/content/`, no hardcoded strings.
2. Reads correctly at 360px, 768px, 1280px, 1920px.
3. Passes `prefers-reduced-motion` — content is simply there, never stuck hidden.
4. Keyboard-navigable, focus visible, contrast measured in both themes.
5. Lighthouse: Accessibility 100, Best Practices 100, SEO 100. Performance ≥ 90
   desktop. Mobile currently sits around 60-65 — React hydration is the ceiling;
   if you can move it, do, but do not trade away the work to chase it.
6. Screenshotted and actually looked at before you say it works.

---

## 10. Current build architecture

### The hero
`Hero.tsx` (CSS entrance) + `HeroStack.tsx` (the 3D plate composition, rendered
only at ≥1024px so phones never download the portrait) + `HeroBackdrop.tsx` (a
fixed CSS/SVG layer: corner blooms, a masked instrument grid in the right gutter,
one scan sweep, two pulsing detection boxes).

### Sections, in order
`Hero → TechStrip → ProjectStrip (≥768px only) → Projects → Services →
Leadership → Achievements → LightSections (About + FAQ) → Testimonials → Closing`.

`/work` renders the full project grid and then the complete frame index.
`src/content/frames.ts` is the single source for both the moving strip and that
grid — a frame that only exists in a marquee cannot be found again, so the two
surfaces read from one list and cannot drift.

Anchor ids are load-bearing: `#top`, `#work`, `#capabilities`, `#leadership`,
`#proof`, `#about`, `#faq`, `#testimonials`, `#contact`, and `#light-band` — the
nav observes the last one to invert the pill. Renaming one silently breaks
navigation.

### Accent ramp — single source
`globals.css` `@theme` owns `--color-a1..a4`, `--color-accent-ink` (the only
accent safe as small text) and `--color-live` (production status only). Change
them there and nowhere else.

### The site agent
`src/components/Agent/*` is a **canned** widget named Pixel. `useAgent.ts` scores
a question against the patterns in `src/content/agent.ts` and returns that topic's
fixed string. No model in the loop, so nothing can be hallucinated.
`src/app/api/agent/route.ts` scaffolds an LLM tier but is **off** (503) and needs
an explicit cost decision before it is wired.

### The audio system
`src/lib/audio.ts`: a landing ambience bed, a short agent intro bed, and click
SFX. All gated per page load, in-memory only. The voice track was removed
2026-09 — the intro is music only. `AgentPanel`'s message list carries
`data-lenis-prevent`; without it Lenis hijacks the wheel over the panel.

### Dev tooling
`scripts/build-media-ammara.mjs` (the only path into `public/media/ammara/`),
`scripts/build-cv.mjs` (the CV PDF), `scripts/shoot.mjs` and
`scripts/audit-case-studies.mjs` (puppeteer-core against the installed Chrome).
Never run `next build` against the `.next` a dev server is using.
