import AgentMount from "@/components/Agent/AgentMount";
import DecorMount from "@/components/DecorMount";
import Nav from "@/components/Nav";
import HeroBackdrop from "@/components/HeroBackdrop";
import Hero from "@/components/Hero";
import TechStrip from "@/components/TechStrip";
import ProjectStrip from "@/components/ProjectStrip";
import ViewportGate from "@/components/ViewportGate";
import Services from "@/components/Services";
import Projects, { type ProjectCard } from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Achievements from "@/components/Achievements";
import LightSections from "@/components/LightSections";
import Testimonials from "@/components/Testimonials";
import Closing from "@/components/Closing";
import PersonJsonLd from "@/components/PersonJsonLd";
import type { StripItem } from "@/components/ProjectStrip";
import { projects } from "@/content/projects";
import { gallery } from "@/content/site";
import { framesInLane, type Frame } from "@/content/frames";

// The picking happens here, in the Server Component, not inside Projects
// itself: `projects` (full records, `limitations` DRAFT text included) is
// only ever read server-side. Only this narrowed shape crosses into the
// client bundle. See the ProjectCard comment in Projects.tsx for why that
// distinction matters.
const projectCards: ProjectCard[] = projects.map(
  ({
    slug,
    title,
    kicker,
    year,
    role,
    org,
    status,
    domains,
    problem,
    outcome,
    stack,
    links,
    media,
    featured,
    confidential,
  }) => ({
    slug,
    title,
    kicker,
    year,
    role,
    org,
    status,
    domains,
    problem,
    outcome,
    stack,
    links,
    media,
    featured,
    confidential,
  })
);

// slug → title, resolved server-side so Services (a client component) can link
// each capability to its evidence projects without importing projects.ts and
// dragging the DRAFT limitation strings into the client bundle.
const projectTitles: Record<string, string> = Object.fromEntries(
  projects.map((p) => [p.slug, p.title])
);

// Two strip lanes, running in opposite directions. The top lane leads with the
// case studies, then both lanes carry the individual frames from
// src/content/frames.ts — the same list the /work page renders in full, so a
// frame that scrolls past in the ticker is always findable afterwards.
//
// Every frame is Ammara's own capture. There is no "lab" wall of borrowed
// technique demos on this site.
const DOMAIN_TAG: Record<string, string> = {
  "computer-vision": "Vision",
  "edge-ai": "Edge",
  "llm-agents": "LLM / RAG",
  mlops: "MLOps",
  "full-stack": "Full-stack",
};

const asStripItem = (f: Frame): StripItem => ({
  id: f.id,
  title: f.title,
  poster: f.src,
  tag: f.tag,
  href: `/work/${f.slug}`,
});

const stripTop: StripItem[] = [
  ...projects.map((p) => ({
    id: p.slug,
    title: p.title,
    poster: p.media.frames?.[0] ?? p.media.poster,
    tag: DOMAIN_TAG[p.domains[0]] ?? "Vision",
    href: `/work/${p.slug}`,
  })),
  ...framesInLane("top").map(asStripItem),
];

const stripBottom: StripItem[] = [
  ...framesInLane("bottom").map(asStripItem),
  ...gallery.slice(0, 3).map((photo, i) => ({
    id: `field-${i}`,
    title: photo.tag ?? "From the field",
    poster: photo.src,
    tag: "Field",
    href: "/#proof",
  })),
];

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <a className="skip-link" href="#work">Skip to work</a>
      <HeroBackdrop />
      <Nav />

      <main className="flex-1">
        <Hero />
        <TechStrip />
        <ViewportGate min={768}>
          <ProjectStrip top={stripTop} bottom={stripBottom} />
        </ViewportGate>
        <Projects projects={projectCards} />
        <Services projectTitles={projectTitles} />
        <Leadership />
        <Achievements />
        <LightSections />
        <Testimonials />
        <Closing />
      </main>

      <DecorMount />
      <AgentMount />
    </>
  );
}
