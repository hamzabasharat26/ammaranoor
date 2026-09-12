// ---------------------------------------------------------------------------
// THE FRAME INDEX — every individual screen, output and field photograph, in
// one list.
//
// Two surfaces render from this and must never drift apart: the moving strip
// under the hero (src/components/ProjectStrip.tsx) and the full grid at the
// foot of /work. A frame that scrolls past in the ticker has to be findable
// afterwards, which it is not if the ticker is the only place it exists.
//
// Every frame is Ammara's own capture and belongs to exactly one case study.
// `lane` decides which of the two ticker rows it rides on; the /work grid
// ignores it and shows all of them in this order.
// ---------------------------------------------------------------------------

export type Frame = {
  id: string
  /** Short label on the ticker card. */
  title: string
  /** The longer line under it in the /work grid. */
  caption: string
  src: string
  /** Short chip: what kind of work the frame shows. */
  tag: string
  /** Case-study slug this frame belongs to. */
  slug: string
  lane: 'top' | 'bottom'
}

export const frames: Frame[] = [
  // --- MagicQC — AI garment size measurement -------------------------------
  {
    id: 'mq-measure',
    title: 'Size measurement — PASS',
    caption: 'A shirt measured against spec, every panel dimension in centimetres and one verdict for the operator.',
    src: '/media/ammara/magicqc-measure.jpg',
    tag: 'Measurement',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-shirt',
    title: 'Second garment, same station',
    caption: 'A different article type through the same tolerance check — the catalogue changes, the station does not.',
    src: '/media/ammara/magicqc-measure-shirt.jpg',
    tag: 'Measurement',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-trouser',
    title: 'Trouser measurement',
    caption: 'Paused mid-check with the dimensions held on screen, so the operator confirms rather than guesses.',
    src: '/media/ammara/magicqc-measure-trouser.jpg',
    tag: 'Measurement',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-desktop',
    title: 'MagicQC desktop app',
    caption: 'The floor application: seven points of measure, each with its own tolerance and its own result.',
    src: '/media/ammara/magicqc-desktop.jpg',
    tag: 'Desktop app',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-web',
    title: 'MagicQC web app',
    caption: 'Brands, operators and purchase orders — the system of record that makes a measurement auditable.',
    src: '/media/ammara/magicqc-web.jpg',
    tag: 'Web app',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-rig',
    title: 'Deployed station',
    caption: 'The measurement station as installed on the production line at MEB Karachi — camera boom, lit table, operator screen.',
    src: '/media/ammara/magicqc-rig.jpg',
    tag: 'Deployment',
    slug: 'magicqc-size-measurement',
    lane: 'top',
  },
  {
    id: 'mq-run',
    title: 'Station running',
    caption: 'A garment placed, measured and graded on the line, in seconds.',
    src: '/media/ammara/magicqc-rig-run.jpg',
    tag: 'Deployment',
    slug: 'magicqc-size-measurement',
    lane: 'bottom',
  },
  {
    id: 'mq-stand',
    title: 'MagicQC at Textile Asia',
    caption: 'The stand at the 32nd Textile Asia Expo, where the station was demonstrated live to mill buyers.',
    src: '/media/ammara/magicqc-stand.jpg',
    tag: 'Exhibited',
    slug: 'magicqc-size-measurement',
    lane: 'bottom',
  },

  // --- Fabric defect detection ---------------------------------------------
  {
    id: 'fb-fusion',
    title: 'Defect fusion output',
    caption: 'One frame, four stages: raw cloth, PatchCore anomaly heatmap, YOLO detections, fused result.',
    src: '/media/ammara/fabric-fusion-1.jpg',
    tag: 'Vision',
    slug: 'fabric-defect-detection',
    lane: 'top',
  },
  {
    id: 'fb-fusion-2',
    title: 'Unseen defect caught',
    caption: 'The anomaly branch flagging what the supervised branch has no class for.',
    src: '/media/ammara/fabric-fusion-2.jpg',
    tag: 'Anomaly',
    slug: 'fabric-defect-detection',
    lane: 'bottom',
  },
  {
    id: 'fb-dash',
    title: 'Operator dashboard',
    caption: 'Roll statistics, the defect log and the pass/fail call, on the screen the inspector watches.',
    src: '/media/fabric/dashboard.jpg',
    tag: 'Full-stack',
    slug: 'fabric-defect-detection',
    lane: 'top',
  },
  {
    id: 'fb-rig',
    title: 'Inspection rig, mill floor',
    caption: 'Camera and lighting over the fabric roll, operator screen alongside — installed, not prototyped.',
    src: '/media/ammara/fabric-rig.jpg',
    tag: 'Deployment',
    slug: 'fabric-defect-detection',
    lane: 'bottom',
  },
  {
    id: 'fb-result',
    title: 'Live camera view',
    caption: 'A detection boxed on moving cloth, at the speed the line actually runs.',
    src: '/media/fabric/result.jpg',
    tag: 'Vision',
    slug: 'fabric-defect-detection',
    lane: 'bottom',
  },

  // --- UAV surveillance & smart parking ------------------------------------
  {
    id: 'uav-parking',
    title: 'Parking operations view',
    caption: 'Facility-wide video search by person, vehicle, face or plate — detections turned into something searchable.',
    src: '/media/ammara/parking-dashboard.jpg',
    tag: 'Full-stack',
    slug: 'uav-surveillance',
    lane: 'bottom',
  },
  {
    id: 'uav-count',
    title: 'Crowd counting + re-ID',
    caption: '29 people in frame, 48 unique identities held across the scene.',
    src: '/media/ammara/people-count.jpg',
    tag: 'Tracking',
    slug: 'uav-surveillance',
    lane: 'bottom',
  },
  {
    id: 'uav-interact',
    title: 'Interaction detection',
    caption: 'The same tracker deciding who is interacting with whom — 31 in frame, 19 interacting.',
    src: '/media/ammara/interaction-track.jpg',
    tag: 'Tracking',
    slug: 'uav-surveillance',
    lane: 'bottom',
  },
  {
    id: 'uav-street',
    title: 'Street-scene detection',
    caption: 'People, vehicles and carried objects on street footage, each with its confidence.',
    src: '/media/ammara/street-detect.jpg',
    tag: 'Vision',
    slug: 'uav-surveillance',
    lane: 'top',
  },
  {
    id: 'uav-drone',
    title: 'Hexacopter airframe',
    caption: 'The airframe the perception payload flies on.',
    src: '/media/ammara/drone-airframe.jpg',
    tag: 'UAV',
    slug: 'uav-surveillance',
    lane: 'bottom',
  },
  {
    id: 'uav-sim',
    title: 'Gazebo simulation',
    caption: 'The same airframe in simulation — the stack was validated there before it flew.',
    src: '/media/ammara/drone-sim.jpg',
    tag: 'Simulation',
    slug: 'uav-surveillance',
    lane: 'bottom',
  },

  // --- RAG document pipelines ----------------------------------------------
  {
    id: 'rag-answer',
    title: 'Grounded retrieval answers',
    caption: 'A policy question answered from retrieved chunks, each source and its score shown alongside.',
    src: '/media/ammara/rag-chatbot.jpg',
    tag: 'LLM / RAG',
    slug: 'rag-document-pipelines',
    lane: 'top',
  },
  {
    id: 'rag-ocr',
    title: 'OCR term extraction',
    caption: 'Key terms and structured fields pulled out of a scanned document so they enter the same retrieval path.',
    src: '/media/ammara/ocr-extraction.jpg',
    tag: 'OCR',
    slug: 'rag-document-pipelines',
    lane: 'bottom',
  },

  // --- Anomaly detection ----------------------------------------------------
  {
    id: 'an-result',
    title: 'PatchCore evaluation',
    caption: '99.56% AUROC on MVTec AD carpet, with the two misses and the latency gap stated rather than buried.',
    src: '/media/diagrams/anomaly-card.svg',
    tag: 'MLOps',
    slug: 'anomaly-detection-mlops',
    lane: 'top',
  },

  // --- RallyLens ------------------------------------------------------------
  {
    id: 'rl-track',
    title: 'Player + ball tracking',
    caption: 'Every player tracked by identity, ball speed and shot counts drawn over the frame.',
    src: '/media/ammara/rally-hero.jpg',
    tag: 'Tracking',
    slug: 'rallylens-sports-analytics',
    lane: 'bottom',
  },
  {
    id: 'rl-dash',
    title: 'Rally analytics dashboard',
    caption: 'Ball-speed history, per-player shot counts, target geometry and the event timeline.',
    src: '/media/ammara/rally-dashboard.jpg',
    tag: 'Analytics',
    slug: 'rallylens-sports-analytics',
    lane: 'top',
  },
]

export const framesInLane = (lane: Frame['lane']) => frames.filter((f) => f.lane === lane)
export const framesFor = (slug: string) => frames.filter((f) => f.slug === slug)
