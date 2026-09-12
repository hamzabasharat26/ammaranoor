import type { Award, Leadership, Photo, Role } from './types'

// ---------------------------------------------------------------------------
// Identity, positioning and contact. One place. Nothing here is invented — it
// all comes from the three source CVs in docs/drive/ammara/:
//   Ammara_Noor_CV.pdf · Ammara_Noor_CV (3).pdf · Ammara Noor (1).pdf
//
// POSITIONING: the spine of this site is "AI / ML engineer who takes a system
// from data collection to a deployment that runs without her". Computer vision
// is the deepest column; LLM/RAG is the second. Every headline, metric and CTA
// serves that spine. Leadership is the differentiator, not the pitch.
// ---------------------------------------------------------------------------

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel once a domain is live;
 *  the fallback is the default deployment so metadata never resolves to null. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://ammara-noor.vercel.app'

export const site = {
  name: 'Ammara Noor',
  /** The single label the whole site defends. */
  role: 'AI / ML Engineer',
  /** Sub-role for meta and the CV route. Order = depth. */
  roleLong: 'AI / ML Engineer · Computer Vision, LLM & RAG Systems, Production ML',

  /**
   * HERO HEADLINE. Only she can say this line: she collected and labelled the
   * dataset on the mill floor herself, then installed the system on the line.
   */
  headline: 'I collect the data, train the model, and install it on the line.',
  /**
   * Hero sub — names the range and the evidence, in her own CV's terms.
   */
  subhead:
    'Computer vision and LLM systems, end to end. I took a fabric inspection line from fully manual to 95% automated defect detection, shipped retrieval pipelines into live client applications, and rebuilt PatchCore from the paper to 99.56% AUROC.',
  /**
   * About-section opening line, in three parts so the middle clause can be set
   * in the accent gradient.
   */
  aboutLede: {
    before: 'A model that stops at the notebook has not solved anything. I take mine ',
    accent: 'onto the production floor',
    after: ' — and stay until the operators can run it without me.',
  },

  location: 'Lahore, Pakistan',
  relocation: 'Open to Lahore / Islamabad / Karachi / remote',
  availability: 'Available immediately for full-time AI/ML engineering roles',
  /** What the proof section leads with — leadership reach, not client count. */
  reach:
    'Chair of IEEE Women in Engineering at NUTECH and Chief Coordinator of the student council, alongside the engineering.',

  email: 'ammaran620@gmail.com',
  phone: '+92 317 212 9674',

  links: {
    linkedin: 'https://www.linkedin.com/in/ammaranoorkhan',
    github: 'https://github.com/ammaran620-de',
    cv: '/media/Ammara_Noor_CV.pdf',
  },

  /**
   * Headline numbers for the strip under the hero. Every one is verbatim from
   * a CV. Four is the grid; a fifth breaks it.
   */
  proofStrip: [
    { value: '95%', label: 'Defect detection accuracy', context: 'Live production line, held-out test set' },
    { value: '99.56%', label: 'AUROC on MVTec AD', context: 'PatchCore rebuilt from the paper' },
    { value: '~1,600', label: 'Images collected on-site', context: 'Labelled by hand at the mill' },
    { value: '1st', label: 'ICAT National Robotics', context: 'National competition, 2025' },
  ],

  /**
   * CAPABILITIES. Three columns, each backed by shipped work — the `evidence`
   * slugs resolve to real case studies.
   */
  services: [
    {
      n: '01',
      title: 'Production Computer Vision',
      blurb:
        'Detection, classification, segmentation and anomaly detection — from collecting the dataset on your floor to a system running on your camera. Known defects and the ones nobody labelled yet.',
      evidence: ['magicqc-fabric-defect', 'anomaly-detection-mlops'],
    },
    {
      n: '02',
      title: 'LLM & RAG Systems',
      blurb:
        'Ingestion, embeddings, vector retrieval and generation, wired into applications people already use. Chunking and retrieval tuned against real failure cases, not benchmark scores.',
      evidence: ['rag-document-pipelines'],
    },
    {
      n: '03',
      title: 'On-Site Deployment & Delivery',
      blurb:
        'Camera and hardware integration, the API, the operator dashboard, the install, and the rollout with the people who have to use it. I am comfortable in the field, not only at a desk.',
      evidence: ['magicqc-fabric-defect', 'uav-surveillance'],
    },
  ],

  /** SEO. One canonical description; do not let each page invent its own. */
  seo: {
    url: SITE_URL,
    title: 'Ammara Noor — AI / ML Engineer',
    description:
      'AI / ML Engineer in Lahore, Pakistan. Fabric defect detection at 95% accuracy on a live production line (YOLOv8 + PatchCore), PatchCore reproduced from the paper to 99.56% AUROC on MVTec AD, RAG pipelines in production client applications, UAV perception for NESCOM. PyTorch · YOLOv8 · FastAPI · Docker.',
    keywords: [
      'AI ML engineer',
      'machine learning engineer',
      'computer vision engineer',
      'deep learning engineer',
      'RAG engineer',
      'LLM applications engineer',
      'MLOps engineer',
      'AI engineer Pakistan',
      'AI engineer Lahore',
      'production machine learning',
      'YOLOv8 object detection',
      'PatchCore anomaly detection',
      'PyTorch engineer',
      'FastAPI machine learning',
      'women in engineering IEEE',
    ],
    ogImage: '/og/default.jpg',
  },

  /**
   * FAQ. A disclosure widget (CLAUDE.md §5) and the highest-leverage surface
   * for a recruiter scanning in 30 seconds. The "what can you not do" entry is
   * the one that makes the other four believable.
   */
  faq: [
    {
      q: 'Are you available, and where?',
      a: 'Immediately, for full-time AI/ML engineering roles. I am based in Lahore and open to Lahore, Islamabad, Karachi or remote. I graduate from NUTECH in 2026 and have been working in industry alongside the degree since 2025.',
    },
    {
      q: 'What have you actually put into production?',
      a: 'MagicQC — fabric defect detection running on a live line at 95% accuracy on a held-out test set. I collected and labelled the ~1,600-image dataset myself on the mill floor because none existed, trained YOLOv8 for three known defect classes, added PatchCore for the unseen ones, and installed the whole pipeline: camera capture, OpenCV preprocessing, both models, Flask API, React operator dashboard. At Evolvian I shipped RAG pipelines into client-facing applications that are live now.',
    },
    {
      q: 'Vision or LLMs — which are you actually deep in?',
      a: 'Vision is deeper. Detection, anomaly detection and the deployment around them are where most of my production hours are, and where the measurable results are. LLM and RAG work is real but younger: ingestion, embeddings, vector retrieval, chunking strategy and OCR chained into automated document pipelines at Evolvian. I would rather you know which is which than find out later.',
    },
    {
      q: 'How do you know a model works before it goes live?',
      a: 'I evaluate against the failure the system exists to prevent, not the benchmark. For the anomaly pipeline that meant 99.56% AUROC on MVTec AD carpet with the misses named out loud — 87 of 89 defects caught, 26 of 28 good pieces passed, and both misses were stray threads. For the fabric line it meant hunting edge cases under real production light and re-tuning thresholds to cut false positives, because an inspector who stops trusting the alarm turns it off.',
    },
    {
      q: 'What can you not do?',
      a: 'I am not a data-engineering or platform team. I train and serve models and build the API and dashboard around them; I do not run your data warehouse or own your cloud estate. My Docker and Linux are working-level, not SRE-level, and I have not run large-scale distributed training — my optimisation work has been single-node latency and export, such as profiling 535 ms/image on CPU against the 33 ms a 30 FPS line needs and mapping the ONNX/INT8 path to close it.',
    },
  ],

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Proof', href: '/#proof' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'CV', href: '/cv' },
  ],
} as const

export const experience: Role[] = [
  {
    org: 'Robionix Technologies',
    title: 'AI / Computer Vision Engineer (Part-Time)',
    location: 'Lahore, Pakistan',
    start: 'Feb 2026',
    end: 'Jun 2026',
    highlights: [
      { text: 'Built and deployed MagicQC, a fabric defect detection product, from scratch to a live production line — YOLOv8 for three known defect classes paired with PatchCore for defects absent from the training set.', projectSlug: 'magicqc-fabric-defect' },
      { text: 'Went on-site to a textile mill and collected and labelled ~1,600 images myself on the production floor, because there was no existing dataset.', projectSlug: 'magicqc-fabric-defect' },
      { text: 'Installed and integrated the full system — camera capture, OpenCV preprocessing, both models, Flask API, React dashboard, Dockerised — and worked with mill operators through rollout.' },
      { text: 'Re-tuned thresholds against real production conditions to cut false positives rather than chase benchmark accuracy.' },
      { text: 'Exhibited at the 32nd Textile Asia Expo; Nishat Mills, Gul Ahmed and Sapphire requested evaluations. Presented the technology and business case at a national industry open house.' },
    ],
  },
  {
    org: 'Evolvian Softwares',
    title: 'Full-Stack AI Developer',
    location: 'Lahore, Pakistan',
    start: 'Aug 2025',
    end: 'Jan 2026',
    highlights: [
      { text: 'Shipped production RAG pipelines end to end — document ingestion, embeddings, vector retrieval, LLM generation — into live client applications.', projectSlug: 'rag-document-pipelines' },
      { text: 'Rebuilt chunking and retrieval strategy after diagnosing why standard metrics did not predict real failures, raising output consistency across messy client documents.', projectSlug: 'rag-document-pipelines' },
      { text: 'Collapsed a multi-step manual review process into one automated pipeline by chaining LLM text processing, OCR and YOLOv8 detection.' },
      { text: 'Built the REST APIs and React dashboards, with role-based auth and live updates, that turned model output into something end users could act on.' },
      { text: 'Owned features from client requirement to deployed release — scoping, build, troubleshooting, delivery — working directly with clients.' },
    ],
  },
  {
    org: 'National Development Complex (NESCOM)',
    title: 'AI & UAV Engineering Intern',
    location: 'Islamabad, Pakistan',
    start: 'Jul 2025',
    end: 'Sep 2025',
    highlights: [
      { text: 'Built a UAV surveillance system performing person tracking and vehicle detection on live aerial video feeds.', projectSlug: 'uav-surveillance' },
      { text: 'Delivered a smart parking dashboard rendering live detections and slot occupancy from the raw detection stream.', projectSlug: 'uav-surveillance' },
    ],
  },
]

export const education = {
  degree: 'BS Computer Engineering',
  institution: 'National University of Technology (NUTECH)',
  location: 'Islamabad',
  years: '2022 - 2026',
  grade: 'CGPA 3.44 / 4.00',
  coursework:
    'Machine learning, deep learning, computer vision, databases, data structures and algorithms, object-oriented programming.',
}

export const awards: Award[] = [
  { place: '1st', title: 'ICAT National Robotics Competition', event: 'ICAT', year: '2025' },
  { place: 'Runner-up', title: 'NAIS National AI Seminar', event: 'NAIS', year: '2025' },
  { place: 'Fellow', title: 'Millennium Fellowship', event: 'United Nations Academic Impact', year: '' },
  { place: 'Ambassador', title: '6th International Student Convention & Expo', event: 'Islamabad · 3-6 May', year: '2026' },
  { place: 'Exhibitor', title: 'MagicQC at the 32nd Textile Asia Expo', event: 'Lahore Expo Centre', year: '2026', projectSlug: 'magicqc-fabric-defect' },
]

/**
 * Leadership and outreach. Not decoration — this is the half of the record a
 * CV bullet list flattens, and it is what separates her from an equally
 * qualified engineer. Every entry is CV-backed except where noted.
 */
export const leadership: Leadership[] = [
  {
    role: 'Chair, IEEE Women in Engineering',
    org: 'NUTECH Student Branch',
    period: '2025 - 2026',
    blurb:
      'I lead the university’s Women in Engineering affinity group — the events, the committee and the turnout — under the IEEE Islamabad Section.',
    media: {
      kind: 'clip',
      poster: '/media/ammara/ieee-day.jpg',
      webm: '/media/ammara/ieee-day.webm',
      mp4: '/media/ammara/ieee-day.mp4',
      alt: 'The IEEE Day 2025 stage line-up at the Islamabad Section event, the WIE and Region 10 banner behind the committee.',
    },
  },
  {
    role: 'Chief Coordinator',
    org: 'NUTECH Student Council (NSC)',
    period: '2025 - 2026',
    blurb:
      'Elected to coordinate the student council across the university’s societies and events.',
    media: {
      kind: 'clip',
      poster: '/media/ammara/nsc-result.jpg',
      webm: '/media/ammara/nsc-result.webm',
      mp4: '/media/ammara/nsc-result.mp4',
      alt: 'The moment the NUTECH Student Council result is announced in the main auditorium, the hall on its feet.',
    },
  },
  {
    role: 'Millennium Fellow',
    org: 'United Nations Academic Impact',
    period: '',
    blurb:
      'Selected for the UNAI and MCN leadership programme for students running social-impact projects on their campuses.',
  },
  {
    role: 'Ambassador',
    org: '6th International Student Convention & Expo 2026',
    period: 'May 2026',
    blurb:
      'Recognised for outstanding ambassadorship at the convention in Islamabad, 3-6 May 2026.',
    media: {
      kind: 'image',
      poster: '/media/ammara/isce-ambassador.jpg',
      alt: 'The 6th International Student Convention & Expo shield beside the certificate of participation awarded to Ammara Noor for her ambassadorship.',
    },
  },
]

/**
 * Field / credibility photos. All from real events — Textile Asia at the
 * Lahore Expo Centre, IEEE Day, the ICAT robotics build, university meetings.
 * Nothing staged, nothing stock (CLAUDE §7).
 */
export const gallery: Photo[] = [
  { src: '/media/ammara/textile-asia-stand.jpg', alt: 'Ammara at the Textile Asia 2026 exhibition wall at the Lahore Expo Centre.', tag: 'Textile Asia 2026 · Lahore', aspect: '3/4' },
  { src: '/media/ammara/magicqc-team.jpg', alt: 'Ammara with the MagicQC exhibitor team under the stand canopy at Textile Asia.', tag: 'MagicQC stand · the team', aspect: '3/2' },
  { src: '/media/ammara/ai-competition-award.jpg', alt: 'Ammara accepting a competition certificate on stage for an AI application build.', tag: 'AI application competition', aspect: '3/4' },
  { src: '/media/ammara/rector-ai-programs.jpg', alt: 'Students and faculty meeting the Rector of NUTECH on the steps of the campus to discuss AI programmes at the university.', tag: 'AI programmes · NUTECH', aspect: '3/2' },
  { src: '/media/ammara/ieee-day-team.jpg', alt: 'The IEEE Women in Engineering committee at IEEE Day, Islamabad Section, in front of the IEEE Day Region 10 banner.', tag: 'IEEE Day · WIE committee', aspect: '3/4' },
  { src: '/media/proof/icat-robot.jpg', alt: 'The autonomous sorting robot built for the ICAT National Robotics Competition, bins labelled metal / plastic / unknown.', tag: 'ICAT robotics · 1st place', aspect: '4/3' },
  { src: '/media/ammara/textile-asia-portrait.jpg', alt: 'Ammara at the Textile Asia 2026 backdrop, thread cones mounted around the lettering.', tag: 'Textile Asia 2026', aspect: '3/4' },
  { src: '/media/proof/client-talk.jpg', alt: 'Ammara in a working discussion with visitors at the exhibition table during Textile Asia.', tag: 'Client meeting · Textile Asia', aspect: '3/2' },
]

/**
 * Skills, grouped by what the skill lets you DO, not by vendor. Order within
 * each group is by depth, not alphabet. Never render this as a wall of logos.
 */
export const skillGroups = [
  {
    title: 'Computer Vision',
    items: ['YOLOv8 detection', 'Anomaly detection (PatchCore)', 'Image classification', 'Segmentation', 'Object tracking', 'OCR', 'Real-time video analytics', 'Image processing'],
  },
  {
    title: 'LLM & Generative AI',
    items: ['Retrieval-augmented generation', 'Embeddings', 'Vector search', 'Chunking & retrieval strategy', 'Prompt engineering', 'LLM API integration', 'Structured outputs', 'Document processing'],
  },
  {
    title: 'ML Engineering & Evaluation',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'Ultralytics', 'OpenCV', 'NumPy', 'Pandas', 'MLflow', 'AUROC / mAP / F1', 'Latency profiling', 'ONNX export'],
  },
  {
    title: 'Deployment & Delivery',
    items: ['FastAPI', 'Flask', 'Docker', 'Linux', 'Git', 'REST API design', 'On-site installation', 'Live camera & hardware integration', 'Production troubleshooting'],
  },
  {
    title: 'Data & Backend',
    items: ['Dataset collection & labelling', 'Roboflow', 'Preprocessing pipelines', 'Node.js', 'Express.js', 'MySQL', 'SQLite', 'Role-based auth'],
  },
  {
    title: 'Frontend & Languages',
    items: ['React.js', 'Next.js', 'Operator dashboards', 'Live-updating interfaces', 'Python', 'JavaScript (ES6+)', 'SQL', 'C / C++'],
  },
]
