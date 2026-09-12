import type { Project } from './types'

// ---------------------------------------------------------------------------
// SOURCE OF TRUTH: the three CVs in docs/drive/ammara/ plus the public repo
// github.com/ammaran620-de/industrial-anomaly-detection-mlops, whose README
// carries the full evaluation table the anomaly case study quotes.
//
// Every number below is taken from one of those verbatim. Do not add a metric
// that is not in a source and that Ammara cannot defend in an interview — one
// inflated number invalidates the rest.
//
// Four projects, because four are real. A fifth padded entry would cost more
// credibility than the extra card buys.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: 'magicqc-size-measurement',
    title: 'MagicQC',
    kicker: 'AI garment size measurement \u2014 deployed on the line',
    year: '2026',
    role: 'AI / Computer Vision Engineer',
    org: 'Robionix Technologies',
    status: 'production',
    domains: ['computer-vision', 'full-stack'],

    problem:
      'Finished garments are size-checked by hand with a tape measure, so a QC pass is slow, two operators disagree on the same piece, and once the carton ships there is no record of what was actually measured.',

    approach: [
      'Built the measurement pipeline: a fixed camera over the garment, segmentation of the piece from the table, then each point of measure derived from the extracted outline instead of read off a tape.',
      'Called every point of measure against the buyer\u2019s own tolerance and returned one verdict the operator can act on \u2014 PASS or FAIL, with the deviating panel named rather than the whole piece rejected.',
      'Shipped it as a desktop application on the factory floor, so the station keeps working when the site network does not.',
      'Built the web side too: brands, article types, styles and sizes, operators and purchase orders \u2014 the system of record that turns individual measurements into something a QC manager can audit.',
      'Installed and commissioned the station on the production line at MEB Karachi and ran it with the operators who use it.',
      'Exhibited it at the 32nd Textile Asia Expo, demonstrating live measurement to mill buyers.',
    ],

    // No accuracy figure is quoted here on purpose: the 95% in the CV belongs to
    // the fabric-defect system, and there is no published measurement-accuracy
    // number for this one. Scope facts only, all of them checkable.
    outcome: [
      { label: 'Deployment', value: 'Live on the line', note: 'Commissioned at MEB Karachi, running with operators.' },
      { label: 'Delivery', value: 'Desktop + web', note: 'Floor application plus the brand, operator and purchase-order system behind it.' },
      { label: 'Per garment', value: '7 points of measure', note: 'Shoulders, hem, length, cuff, waist and chest, each against its own tolerance.' },
      { label: 'After the expo', value: '3 mills', note: 'Nishat Mills, Gul Ahmed and Sapphire requested evaluations.' },
    ],

    limitations: [
      'The capture rig is part of the product, not an accessory: the measurement assumes a fixed camera height, a flat table and controlled lighting. Move any of the three and it needs recalibrating.',
      'The garment has to be laid out flat and unfolded. Drape, a rucked hem or a heavy knit that relaxes on the table all read as a dimension change.',
      'Tolerances are per article type. A style outside the configured catalogue has to be set up before it can be measured, which is a data-entry job, not a model one.',
    ],

    stack: ['PyTorch', 'OpenCV', 'Python', 'Electron', 'React', 'Node.js', 'MySQL', 'Docker'],

    links: [],

    media: {
      poster: '/media/ammara/magicqc-measure.jpg',
      alt: 'The MagicQC measurement view returning a PASS on a shirt, every panel dimension drawn on the garment in centimetres.',
      gallery: [
        { kind: 'image', src: '/media/ammara/magicqc-measure.jpg', caption: 'A shirt measured against spec: every panel dimension in centimetres, verdict PASS.' },
        { kind: 'image', src: '/media/ammara/magicqc-measure-shirt.jpg', caption: 'A second garment type through the same station, same tolerance check, same one-word verdict.' },
        { kind: 'image', src: '/media/ammara/magicqc-measure-trouser.jpg', caption: 'Trouser measurement paused mid-check, the dimensions held on screen for the operator to confirm.' },
        { kind: 'image', src: '/media/ammara/magicqc-desktop.jpg', caption: 'The desktop app on the floor: seven points of measure, each with its own tolerance and result. Cropped to the measurement panel \u2014 the sample brand logos beside it are not ours to publish.', fit: 'contain' },
        { kind: 'image', src: '/media/ammara/magicqc-web.jpg', caption: 'The web app: brands, operators and purchase orders \u2014 the system of record behind the station.', fit: 'contain' },
        { kind: 'clip', src: '/media/ammara/magicqc-rig-run.jpg', webm: '/media/ammara/magicqc-rig-run.webm', mp4: '/media/ammara/magicqc-rig-run.mp4', caption: 'The deployed station running on the production line at MEB Karachi.' },
        { kind: 'image', src: '/media/ammara/magicqc-rig.jpg', caption: 'The measurement station as installed \u2014 camera boom, lit table, operator screen.' },
        { kind: 'image', src: '/media/ammara/magicqc-stand.jpg', caption: 'The MagicQC stand at the 32nd Textile Asia Expo, demonstrated live to mill buyers.' },
        { kind: 'image', src: '/media/ammara/magicqc-team.jpg', caption: 'The MagicQC exhibitor team on the stand at Textile Asia.' },
      ],
    },

    featured: true,
    confidential:
      'Client product. The source is not public; the deployed station, the interface and the exhibition material are what can be shown.',
  },

  {
    slug: 'fabric-defect-detection',
    title: 'Fabric Defect Detection',
    kicker: 'Textile inspection \u2014 live mill floor',
    year: '2026',
    role: 'AI / Computer Vision Engineer',
    org: 'Robionix Technologies',
    status: 'production',
    domains: ['computer-vision', 'mlops'],

    problem:
      'Fabric defects are caught by inspectors watching cloth move past them, so the rare ones slip through, two inspectors disagree on the same roll, and nothing is written down that the mill can act on later.',

    approach: [
      'Collected and labelled ~1,600 images myself on the mill floor \u2014 there was no dataset to start from, and a public benchmark would not have matched this cloth, this lighting or this camera.',
      'Trained YOLOv8 on three known defect classes, then added PatchCore anomaly detection on top so defect types absent from the training set are still caught instead of passing as clean.',
      'Fused the two branches into one call per frame, so the operator sees a single verdict rather than two models disagreeing.',
      'Built the whole runtime path: camera capture, OpenCV preprocessing, both models in sequence, a Flask inference API, and a React dashboard the operator actually watches. Dockerised for install.',
      'Installed it on the line and worked with the mill operators through rollout \u2014 the part where a system either gets used or gets switched off.',
      'Chased edge cases under real production conditions and re-tuned thresholds to cut false positives, because an inspector who stops trusting the alarm ignores it.',
    ],

    outcome: [
      { label: 'Accuracy', value: '95%', note: 'Held-out test split, on the live production line.' },
      { label: 'Dataset', value: '~1,600 images', note: 'Collected and labelled on-site at the mill.' },
      { label: 'Defect classes', value: '3 + unseen', note: 'YOLOv8 for the known three, PatchCore for everything else.' },
      { label: 'Verdict', value: 'One per frame', note: 'Supervised and anomaly branches fused before the operator sees them.' },
    ],

    limitations: [
      'Trained on one mill\u2019s cloth under one lighting rig. Different fabric, different light or a moved camera means re-collecting a reference set and re-tuning the threshold \u2014 the model does not transfer for free.',
      'Only three defect types are classified by name. Everything else is flagged as an anomaly, which tells the operator that something is wrong but not what it is.',
      'The anomaly branch is the sensitive one: raising recall on unseen defects raises the false-positive rate, and the balance point is a business decision the mill makes, not one the model settles.',
    ],

    stack: ['YOLOv8', 'PatchCore', 'PyTorch', 'OpenCV', 'Flask', 'React', 'Docker', 'Python', 'Roboflow'],

    links: [
      { label: 'Source', href: 'https://github.com/ammaran620-de/Febric-Defect-Detection-', kind: 'code' },
    ],

    media: {
      poster: '/media/ammara/fabric-fusion-1.jpg',
      alt: 'Four-panel fabric inspection output: the raw camera frame, the PatchCore anomaly heatmap, the YOLO detections, and the fused result with confidence scores.',
      gallery: [
        { kind: 'image', src: '/media/ammara/fabric-fusion-1.jpg', caption: 'One frame, four stages: raw cloth, PatchCore anomaly heatmap, YOLO detections, fused result.' },
        { kind: 'image', src: '/media/ammara/fabric-fusion-2.jpg', caption: 'The same fusion on a different defect \u2014 the anomaly branch flags what the supervised branch has no class for.' },
        { kind: 'clip', src: '/media/fabric/detect.jpg', webm: '/media/fabric/detect.webm', mp4: '/media/fabric/detect.mp4', caption: 'Running live \u2014 defects flare on the heatmap as the cloth moves under the camera.' },
        { kind: 'image', src: '/media/fabric/dashboard.jpg', caption: 'The operator dashboard: roll statistics, the defect log, and the pass/fail call.' },
        { kind: 'image', src: '/media/ammara/fabric-rig.jpg', caption: 'The inspection rig installed on the mill floor \u2014 camera and lighting over the fabric roll, operator screen alongside.' },
        { kind: 'image', src: '/media/fabric/result.jpg', caption: 'The live camera view with a detection boxed on moving cloth.' },
      ],
    },

    featured: true,
    confidential:
      'Client system. The mill deployment is not public; the metrics, the model output and the floor photography are what can be shown.',
  },

  {
    slug: 'anomaly-detection-mlops',
    title: 'Industrial Anomaly Detection',
    kicker: 'PatchCore from the paper, with a production wrapper',
    year: '2026',
    role: 'Solo build',
    org: 'Independent',
    status: 'research',
    domains: ['computer-vision', 'mlops'],

    problem:
      'Supervised defect detection needs labelled examples of every defect you care about, and on a real line that assumption breaks on day one — the dangerous defects are the ones nobody has seen yet, and by the time you have a hundred labelled examples you have already shipped a hundred bad units.',

    approach: [
      'Implemented PatchCore from the original paper rather than pulling a checkpoint: a frozen ImageNet WideResNet-50 feeding layer2 and layer3 features, each patch average-pooled against its 3×3 neighbourhood so small misalignments do not matter.',
      'Built the memory bank from defect-free images only and cut it to 1-5% with greedy k-center coreset subsampling — random sampling would have thrown away the rare-but-normal patches (a seam, a printed marking) that cause false positives when missing.',
      'Set the operating threshold at the 95th percentile of normal scores, because that is the rule you can actually apply in production where only normal data exists — and reported the best-achievable F1 threshold separately as a reference bound, not a recommendation.',
      'Wrapped it the way a model has to be wrapped to be useful: MLflow-tracked runs, a FastAPI service with /health, /predict and /stats, Docker Compose, tests, and an evaluation report.',
      'Made /stats a cheap drift signal — a rolling mean and p95 over recent requests, so a moved camera or new material shows up as a shift instead of as a silent accuracy loss.',
    ],

    outcome: [
      { label: 'Image AUROC', value: '99.56%', note: 'MVTec AD carpet, 0.05 coreset ratio at 320px input.' },
      { label: 'Defects caught', value: '87 / 89', note: 'At the 95th-percentile operating threshold. Both misses were thread defects.' },
      { label: 'Good pieces passed', value: '26 / 28', note: 'Precision, recall and F1 all 0.9775.' },
      { label: 'CPU latency', value: '535 ms', note: 'Against the 33 ms a 30 FPS line needs — the gap is documented, not hidden.' },
    ],

    limitations: [
      'Latency: 535 ms per image on CPU against the 33 ms a 30 FPS line requires. Closing that needs ONNX export, quantisation and a GPU or edge accelerator — mapped out, not built.',
      'Thread defects are the weak spot: 2 of 19 missed. A stray thread is thin and low-contrast on woven carpet, so it barely disturbs local patch statistics where a hole or a cut destroys the texture outright.',
      'Tuned on the carpet category only. Other MVTec categories need their own threshold and probably their own coreset ratio.',
      'Drift detection is rudimentary — a rolling mean catches gross shifts, not gradual ones. Distribution-distance testing is the right fix.',
      'The normal and defective score distributions overlap between 2.03 and 2.18, so perfect separation is not available and the threshold is a genuine cost decision: a missed defect reaches a customer, a false alarm costs an operator thirty seconds.',
    ],

    stack: ['PatchCore', 'PyTorch', 'WideResNet-50', 'MLflow', 'FastAPI', 'Docker', 'ONNX', 'NumPy', 'Python'],

    links: [
      { label: 'Source', href: 'https://github.com/ammaran620-de/industrial-anomaly-detection-mlops', kind: 'code' },
    ],

    // No screenshots of a CLI/API project would tell a reader anything. These
    // two are authored diagrams — the architecture and the measured result —
    // drawn from the repo's own README, and captioned as diagrams.
    media: {
      poster: '/media/diagrams/anomaly-card.svg',
      alt: 'Diagram of the PatchCore pipeline: a frozen WideResNet-50 extracts patch features from defect-free images, greedy k-center coreset subsampling cuts them to a memory bank, and at inference each patch is scored by distance to its nearest neighbour.',
      gallery: [
        { kind: 'image', src: '/media/diagrams/anomaly-card.svg', caption: 'The headline result: 99.56% AUROC, 87 of 89 defects caught, and the latency gap stated rather than buried.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/patchcore-pipeline.svg', caption: 'The pipeline: frozen backbone, patch features, coreset memory bank, nearest-neighbour distance, anomaly heatmap. Nothing is trained.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/patchcore-results.svg', caption: 'Per defect type, with the two thread misses named and the score distributions that make the threshold a real decision.', fit: 'contain' },
      ],
    },

    featured: true,
  },

  {
    slug: 'rag-document-pipelines',
    title: 'RAG Document Pipelines',
    kicker: 'Retrieval in live client applications',
    year: '2025-2026',
    role: 'Full-Stack AI Developer',
    org: 'Evolvian Softwares',
    status: 'production',
    domains: ['llm-agents', 'full-stack'],

    problem:
      'A client’s answers live in documents nobody can search, and a chatbot that invents the answer is worse than no chatbot — so the retrieval has to be right before the language model is even interesting.',

    approach: [
      'Shipped the pipeline end to end into live client applications: document ingestion, embeddings, vector retrieval, then generation — not a demo notebook handed to someone else to productionise.',
      'Rebuilt the chunking and retrieval strategy after diagnosing why the standard metrics were not predicting the failures users actually hit, which raised output consistency on messy real client documents.',
      'Collapsed a multi-step manual review process into a single automated pipeline by chaining LLM text processing, OCR and YOLOv8 detection — three model types in one path.',
      'Wrote the REST APIs and the React dashboards that put the output in front of end users, with role-based auth and live updates.',
      'Worked directly with clients on scoping, requirements and delivery instead of through a project-manager layer.',
    ],

    // No public numbers exist for client work under NDA, and inventing one
    // would break CLAUDE §2. These are scope facts, which are checkable.
    outcome: [
      { label: 'Delivery', value: 'In production', note: 'Live client-facing applications, not a prototype.' },
      { label: 'Pipeline', value: 'LLM + OCR + YOLOv8', note: 'One automated path replacing a multi-step manual review.' },
      { label: 'Ownership', value: 'Scope to release', note: 'Requirements, build, troubleshooting and delivery, client-facing.' },
    ],

    limitations: [
      'This is client work: the code and the retrieval numbers are not mine to publish, so what is verifiable here is scope and stack rather than a benchmark.',
      'Retrieval quality was tuned against the failure cases the client’s own documents produced. That tuning is specific to those documents and would need redoing on a different corpus.',
      'It is a retrieval pipeline, not an agent framework — no long-horizon planning or tool-use loops, and I would not claim experience I do not have there.',
    ],

    stack: ['RAG', 'Embeddings', 'Vector search', 'OCR', 'YOLOv8', 'FastAPI', 'Node.js', 'React', 'MySQL', 'Docker', 'Python'],

    links: [],

    media: {
      poster: '/media/ammara/rag-chatbot.jpg',
      alt: 'The retrieval assistant answering a pricing-policy question, with the retrieved source chunks and their similarity scores listed beside the answer.',
      gallery: [
        { kind: 'image', src: '/media/ammara/rag-chatbot.jpg', caption: 'A policy question answered from the retrieved chunks, each source and its score shown alongside \u2014 grounded, not guessed.', fit: 'contain' },
        { kind: 'image', src: '/media/ammara/ocr-extraction.jpg', caption: 'The OCR branch: key terms and structured fields pulled out of a scanned document so they enter the same retrieval path.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/rag-pipeline.svg', caption: 'The path in full \u2014 ingest, chunk, embed, retrieve, generate \u2014 including the OCR and YOLOv8 branch that replaced the manual review.', fit: 'contain' },
      ],
    },

    featured: true,
    confidential:
      'Client work under a commercial agreement. The architecture and stack are shareable; the client names, corpora and retrieval metrics are not.',
  },

  {
    slug: 'uav-surveillance',
    title: 'UAV Surveillance & Smart Parking',
    kicker: 'Aerial perception — NDC, NESCOM',
    year: '2025',
    role: 'AI & UAV Engineering Intern',
    org: 'National Development Complex (NESCOM)',
    status: 'research',
    domains: ['computer-vision'],

    problem:
      'A live aerial feed is only useful if somebody is watching it, and a person watching a screen cannot reliably track individuals across a wide area or count what is parked below.',

    approach: [
      'Built a UAV surveillance system that tracks people and detects vehicles on live aerial video, where targets are small, the camera is moving and the ground scale changes with altitude.',
      'Turned the raw detection stream into a smart parking dashboard showing live detections and slot occupancy, so the output is a number an operator can act on rather than boxes on a video.',
    ],

    outcome: [
      { label: 'Built for', value: 'NDC, NESCOM', note: 'Pakistan national defence research organisation.' },
      { label: 'Input', value: 'Live aerial video', note: 'Moving camera, small targets.' },
      { label: 'Output', value: 'Occupancy dashboard', note: 'Live detections and slot state.' },
    ],

    limitations: [
      'An internship-length build: it was demonstrated on live feeds, not hardened into a deployment that ran unattended.',
      'Detection holds over a limited altitude band — as ground sample distance grows, people stop being enough pixels to track reliably.',
      'Defence-adjacent work, so the description stays at the level the CV states and no further: no imagery, no site detail, no performance figures.',
    ],

    stack: ['YOLO', 'PyTorch', 'OpenCV', 'Object tracking', 'Python'],

    links: [],

    media: {
      poster: '/media/ammara/parking-dashboard.jpg',
      alt: 'The parking monitoring dashboard: a facility-wide video search over live camera feeds, filtered by person, vehicle, face and licence plate, with recent detections listed underneath.',
      gallery: [
        { kind: 'image', src: '/media/ammara/parking-dashboard.jpg', caption: 'The operator view: search recorded footage across the facility by person, vehicle, face or plate \u2014 detections turned into something searchable.', fit: 'contain' },
        { kind: 'image', src: '/media/ammara/people-count.jpg', caption: 'Person detection and tracking from above: 29 people in frame, 48 unique IDs held across the scene.' },
        { kind: 'image', src: '/media/ammara/interaction-track.jpg', caption: 'The same tracker deciding who is interacting with whom \u2014 31 in frame, 19 interacting.' },
        { kind: 'image', src: '/media/ammara/street-detect.jpg', caption: 'Detection on street footage: people, vehicles and carried objects, each with its confidence.' },
        { kind: 'image', src: '/media/ammara/drone-airframe.jpg', caption: 'The hexacopter airframe the perception payload flies on.' },
        { kind: 'image', src: '/media/ammara/drone-sim.jpg', caption: 'The same airframe in Gazebo \u2014 the stack was validated in simulation before it flew.', fit: 'contain' },
        { kind: 'image', src: '/media/ammara/parking-allocation.jpg', caption: 'The dynamic slot-allocation idea the dashboard serves. The capacity figure on this slide is the product projection, not a result I measured.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/uav-pipeline.svg', caption: 'The perception path in full: feed, detect, track, aggregate.', fit: 'contain' },
      ],
    },

    featured: true,
    confidential:
      'Defence-adjacent work. The two QGroundControl mission plans from this programme are deliberately not published: they show GPS waypoints over a real, identifiable site. The airframe and the simulation carry the same evidence without that.',
  },

  {
    slug: 'rallylens-sports-analytics',
    title: 'RallyLens',
    kicker: 'Sports analytics on ordinary footage',
    // NOTE FOR AMMARA: this is the one project on the site that is not in any
    // of the three source CVs — it was added from your own build screenshots.
    // Add a line for it to the CV so the two agree; until then the copy below
    // stays strictly to what the interface itself shows and claims no metric
    // that is not legible on screen.
    year: '2026',
    role: 'Creator',
    org: 'Independent',
    status: 'research',
    domains: ['computer-vision'],

    problem:
      'Coaching video is a handheld camera pointed at a court, and the analytics tools that exist assume a fixed camera, a regulation court and a labelled dataset — so none of them run on the footage a coach actually has.',

    approach: [
      'Detects and tracks every player through the rally, holding an identity per person rather than a box per frame.',
      'Recovers the ball — small, fast and motion-blurred — and reads a speed off it, then counts shots and rallies from the track rather than from a manual tag.',
      'Renders the result two ways: an annotated video a coach can watch, and a dashboard with the per-player counts, the ball-speed history and an event timeline.',
    ],

    outcome: [
      { label: 'Tracked per rally', value: '4 players + ball', note: 'Identity held across the clip, not re-detected per frame.' },
      { label: 'Ball speed', value: 'Read live', note: 'Derived from the recovered ball track and drawn on the frame.' },
      { label: 'Output', value: 'Video + dashboard', note: 'Annotated clip plus per-player counts and an event timeline.' },
    ],

    limitations: [
      'Built and tested on the clips I had, not on a benchmark set — treat the numbers on screen as its own output, not as a validated accuracy figure.',
      'The ball is the hard part: it is a few pixels wide and motion-blurred, so the track is partly inferred between detections rather than detected in every frame.',
      'Court geometry is annotated once by hand. Automatic court-line detection is not built.',
    ],

    stack: ['YOLO', 'Object tracking', 'OpenCV', 'Pose estimation', 'Python'],

    links: [],

    media: {
      poster: '/media/ammara/rally-hero.jpg',
      alt: 'RallyLens tracking four players and the ball on a court, with per-player labels, ball speed and shot counts drawn over the frame.',
      gallery: [
        { kind: 'image', src: '/media/ammara/rally-hero.jpg', caption: 'Live overlay: every player tracked by identity, ball speed and shot counts drawn on the frame.' },
        { kind: 'image', src: '/media/ammara/rally-dashboard.jpg', caption: 'The dashboard behind it — ball-speed history, per-player shot counts, target geometry and the event timeline.', fit: 'contain' },
      ],
    },

    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
