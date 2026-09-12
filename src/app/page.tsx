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

// The strip: every shipped project, then the field photography. Project cards
// deep-link to the case study; the photographs jump to the proof section.
//
// There is no "lab" wall on this site. A technique wall needs Ammara's own
// capture of each technique running; anything else would be someone else's
// demo reel with her name over it.
const DOMAIN_TAG: Record<string, string> = {
  "computer-vision": "Vision",
  "edge-ai": "Edge",
  "llm-agents": "LLM / RAG",
  mlops: "MLOps",
  "full-stack": "Full-stack",
};

const stripItems: StripItem[] = [
  ...projects.map((p) => ({
    id: p.slug,
    title: p.title,
    poster: p.media.frames?.[0] ?? p.media.poster,
    tag: DOMAIN_TAG[p.domains[0]] ?? "Vision",
    href: `/work/${p.slug}`,
  })),
  ...gallery.slice(0, 5).map((photo, i) => ({
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
          <ProjectStrip items={stripItems} />
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
