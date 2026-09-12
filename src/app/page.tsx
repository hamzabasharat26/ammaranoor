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

// Two strip lanes, running in opposite directions. The top lane is the case
// studies; the bottom lane is the individual screens and field frames, each
// deep-linked to the case study it belongs to.
//
// Every frame below is Ammara's own capture. There is no "lab" wall of
// technique demos on this site: that needs her own recording of each technique
// running, and anything else is someone else's demo reel with her name on it.
const DOMAIN_TAG: Record<string, string> = {
  "computer-vision": "Vision",
  "edge-ai": "Edge",
  "llm-agents": "LLM / RAG",
  mlops: "MLOps",
  "full-stack": "Full-stack",
};

const stripTop: StripItem[] = projects.map((p) => ({
  id: p.slug,
  title: p.title,
  poster: p.media.frames?.[0] ?? p.media.poster,
  tag: DOMAIN_TAG[p.domains[0]] ?? "Vision",
  href: `/work/${p.slug}`,
}));

const stripBottom: StripItem[] = [
  { id: "s-fusion", title: "Defect fusion output", poster: "/media/ammara/fabric-fusion-2.jpg", tag: "Vision", href: "/work/magicqc-fabric-defect" },
  { id: "s-rig", title: "Inspection rig, mill floor", poster: "/media/ammara/fabric-rig.jpg", tag: "Deployed", href: "/work/magicqc-fabric-defect" },
  { id: "s-dash", title: "Operator dashboard", poster: "/media/fabric/dashboard.jpg", tag: "Full-stack", href: "/work/magicqc-fabric-defect" },
  { id: "s-web", title: "MagicQC web app", poster: "/media/ammara/magicqc-web.jpg", tag: "Full-stack", href: "/work/magicqc-fabric-defect" },
  { id: "s-desktop", title: "MagicQC desktop app", poster: "/media/ammara/magicqc-desktop.jpg", tag: "Vision", href: "/work/magicqc-fabric-defect" },
  { id: "s-parking", title: "Parking operations view", poster: "/media/ammara/parking-dashboard.jpg", tag: "Full-stack", href: "/work/uav-surveillance" },
  { id: "s-count", title: "Crowd counting + re-ID", poster: "/media/ammara/people-count.jpg", tag: "Tracking", href: "/work/uav-surveillance" },
  { id: "s-interact", title: "Interaction detection", poster: "/media/ammara/interaction-track.jpg", tag: "Tracking", href: "/work/uav-surveillance" },
  { id: "s-street", title: "Street-scene detection", poster: "/media/ammara/street-detect.jpg", tag: "Vision", href: "/work/uav-surveillance" },
  { id: "s-drone", title: "Hexacopter airframe", poster: "/media/ammara/drone-airframe.jpg", tag: "UAV", href: "/work/uav-surveillance" },
  { id: "s-rag", title: "Grounded retrieval answers", poster: "/media/ammara/rag-chatbot.jpg", tag: "LLM / RAG", href: "/work/rag-document-pipelines" },
  { id: "s-ocr", title: "OCR term extraction", poster: "/media/ammara/ocr-extraction.jpg", tag: "OCR", href: "/work/rag-document-pipelines" },
  { id: "s-rally", title: "Player + ball tracking", poster: "/media/ammara/rally-hero.jpg", tag: "Tracking", href: "/work/rallylens-sports-analytics" },
  { id: "s-anomaly", title: "PatchCore evaluation", poster: "/media/diagrams/anomaly-card.svg", tag: "MLOps", href: "/work/anomaly-detection-mlops" },
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
