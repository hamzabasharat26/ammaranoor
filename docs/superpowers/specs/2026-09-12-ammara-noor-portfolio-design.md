# Ammara Noor portfolio — rebrand + redesign spec

Date: 2026-09-12
Status: approved (decisions taken 2026-09-12)

## Goal

Convert this repository from Hamza Basharat's portfolio into **Ammara Noor's**
portfolio. Ammara is an AI / ML Engineer (computer vision, LLM/RAG systems,
production ML), Lahore, Pakistan, available immediately.

Every claim on the site must trace to one of the three source CVs:
`Ammara_Noor_CV.pdf`, `Ammara_Noor_CV (3).pdf`, `Ammara Noor (1).pdf`.

## Identity

| Field | Value |
|---|---|
| Name | Ammara Noor |
| Role | AI / ML Engineer |
| Role (long) | AI / ML Engineer · Computer Vision, LLM & RAG Systems, Production ML |
| Location | Lahore, Pakistan |
| Email | ammaran620@gmail.com |
| Phone | +92 317 212 9674 |
| LinkedIn | linkedin.com/in/ammaranoorkhan |
| GitHub | github.com/ammaran620-de |
| Education | BS Computer Engineering, NUTECH Islamabad, 2022–2026, CGPA 3.44/4.00 |

## Verified numbers (the only ones allowed on the site)

- 95% accuracy — fabric defect detection, held-out test split, live production line
- ~1,600 images — collected and labelled on-site at a textile mill, 3 defect classes
- 99.56% AUROC — PatchCore on MVTec AD carpet
- 87/89 defects caught, 26/28 good pieces passed — same evaluation
- 535 ms/image CPU vs the 33 ms a 30 FPS line needs — documented latency gap
- 32nd Textile Asia Expo — Nishat Mills, Gul Ahmed, Sapphire requested evaluations
- 1st place, ICAT National Robotics Competition 2025
- Runner-up, NAIS 2025 National AI Seminar
- CGPA 3.44 / 4.00

## Projects (four, all CV-backed)

1. **MagicQC — fabric defect detection** (Robionix, Feb–Jun 2026). YOLOv8 for three
   known defect classes + PatchCore for unseen defects. Dataset collected on-site.
   Pipeline: camera → OpenCV → dual-model inference → Flask API → React dashboard,
   Dockerised. Exhibited at 32nd Textile Asia.
2. **Industrial anomaly detection — MLOps pipeline** (research). PatchCore from the
   paper: frozen CNN features, patch memory bank, 1% greedy k-center coreset,
   defect-free training only. MLflow evaluation loop, FastAPI serving, ONNX/INT8
   optimisation path documented.
3. **RAG document pipelines** (Evolvian, Aug 2025 – Jan 2026). Ingestion, embeddings,
   vector retrieval, LLM generation into live client applications. Chunking/retrieval
   strategy rebuilt after diagnosing why standard metrics missed real failures.
   LLM + OCR + YOLOv8 chained into one automated review pipeline.
4. **UAV surveillance & smart parking** (NDC, NESCOM, Jul–Sep 2025). Person tracking
   and vehicle detection on live aerial video; dashboard rendering live detections
   and slot occupancy.

Every Hamza-only project is **deleted**, not adapted: RallyLens, SafePulse,
DockVision AI, SkyResQ, PPE safety detection, industrial pose suite, and the
garment-size-measurement framing of MagicQC.

## Leadership & impact (new section — her differentiator)

Chair, IEEE Women in Engineering (NUTECH SB) · Chief Coordinator, NUTECH Student
Council · Millennium Fellow, UN Academic Impact · Ambassador, 6th International
Student Convention & Expo 2026 (Islamabad, 3–6 May 2026) · 1st place ICAT robotics ·
NAIS runner-up · AI-application competition win · Textile Asia 2026 exhibitor.

## Media decisions (user-approved 2026-09-12)

- MagicQC + fabric-defect captures: **hers to publish**, kept. Garment-size-measurement
  UI captures held back — her CV does not claim size measurement.
- Team photo at the MagicQC stand: **kept in full**, Hamza in frame.
- Everything showing Hamza's face alone: deleted (ta-1/3/4/5, client solo shots,
  teaching/*, workshop-lahore, pose/*, demos with faces, lab/age-gender, lab/emotion).
- `public/media/sounds/agent-voice.mp3`: deleted, and its wiring removed from
  `src/lib/audio.ts`.
- New photos ingested: profile portrait, Textile Asia 2026 ×2, IEEE Day ×2,
  AI-competition win ×2, 6th ISC&E ambassador medal + certificate, Rector NUTECH
  AI-programs meeting.
- New videos ingested with audio stripped, encoded webm+mp4+poster, muted, ≤6 s loops
  where used as loops: NSC chief-coordinator win, IEEE WIE chair celebration.

## Design

- **Palette**: warm paper, light-first. Ground `#FBFAF8`, card `#FFFFFF`, ink `#16161D`,
  muted `#5B5B66`. Accent ramp indigo `#6366F1` → violet `#8B5CF6` → rose `#EC4899`,
  sky `#0EA5E9` for links/status. Dark mode retained as a counterpart, light is default.
- **Motion**: GSAP + ScrollTrigger + CSS 3D (`perspective`, `preserve-3d`). No
  framer-motion (bundle budget), no WebGL/Three.js (CLAUDE.md §4).
- **Hero**: layered 3D parallax that tilts to pointer, static DOM first paint,
  frozen under `prefers-reduced-motion`.
- **Icons**: lucide-react (already a dependency).

## Deliverables

1. Content rewrite: `site.ts`, `projects.ts`, `lab.ts`, `agent.ts`, `testimonials.ts`.
2. Media pipeline: deletions, ingestion, encoding, generated project diagrams.
3. Theme + hero + component redesign, new Leadership section.
4. One-page ATS CV: single narrow column, no tables or graphics, keyword-dense,
   rendered HTML → PDF, wired to `/cv` and the download link.
5. Metadata: SEO, sitemap, robots, OG image, JSON-LD, README, CLAUDE.md, AGENTS.md.
6. Verification: `next build`, Lighthouse, security review, Vercel deploy prep.

## Constraints kept from the old CLAUDE.md

- §2 nothing invented; every number traces to a CV.
- §4 motion budget: 250 KB gz on the home route, no WebGL, reduced-motion respected.
- §5 WCAG 2.1 AA: 4.5:1 body text, visible focus, real disclosure widgets, meaningful alt.
- Testimonials array stays empty until real recommendations exist.
