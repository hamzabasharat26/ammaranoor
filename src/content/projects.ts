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
    slug: 'magicqc-fabric-defect',
    title: 'MagicQC',
    kicker: 'Fabric inspection — live textile line',
    year: '2026',
    role: 'AI / Computer Vision Engineer',
    org: 'Robionix Technologies',
    status: 'production',
    domains: ['computer-vision', 'mlops'],

    problem:
      'Fabric defects are caught by inspectors watching cloth move past them, so the rare ones slip through, two inspectors disagree on the same roll, and nothing is written down that the mill can act on later.',

    approach: [
      'Collected and labelled ~1,600 images myself on the mill floor — there was no dataset to start from, and a public benchmark would not have matched this cloth, this lighting or this camera.',
      'Trained YOLOv8 on three known defect classes, then added PatchCore anomaly detection on top so defect types absent from the training set are still caught instead of passing as clean.',
      'Built the whole runtime path: camera capture, OpenCV preprocessing, both models in sequence, a Flask inference API, and a React dashboard the operator actually watches. Dockerised for install.',
      'Installed it on the line and worked with the mill operators through rollout — the part where a system either gets used or gets switched off.',
      'Chased edge cases under real production conditions and re-tuned thresholds to cut false positives, because an inspector who stops trusting the alarm ignores it.',
    ],

    outcome: [
      { label: 'Accuracy', value: '95%', note: 'Held-out test split, on the live production line.' },
      { label: 'Dataset', value: '~1,600 images', note: 'Collected and labelled on-site at the mill.' },
      { label: 'Defect classes', value: '3 + unseen', note: 'YOLOv8 for the known three, PatchCore for everything else.' },
      { label: 'After the expo', value: '3 mills', note: 'Nishat Mills, Gul Ahmed and Sapphire requested evaluations.' },
    ],

    limitations: [
      'Trained on one mill’s cloth under one lighting rig. Different fabric, different light or a moved camera means re-collecting a reference set and re-tuning the threshold — the model does not transfer for free.',
      'Only three defect types are classified by name. Everything else is flagged as an anomaly, which tells the operator that something is wrong but not what it is.',
      'The anomaly branch is the sensitive one: raising recall on unseen defects raises the false-positive rate, and the balance point is a business decision the mill makes, not one the model settles.',
    ],

    stack: ['YOLOv8', 'PatchCore', 'PyTorch', 'OpenCV', 'Flask', 'React', 'Docker', 'Python', 'Roboflow'],

    links: [
      { label: 'Source', href: 'https://github.com/ammaran620-de/Febric-Defect-Detection-', kind: 'code' },
    ],

    media: {
      poster: '/media/fabric-poster.jpg',
      alt: 'Four-panel fabric inspection output: the raw camera frame, the PatchCore anomaly heatmap, the YOLO detections, and the fused result with confidence scores.',
      gallery: [
        { kind: 'image', src: '/media/fabric-poster.jpg', caption: 'One frame, four stages: raw cloth, PatchCore anomaly heatmap, YOLO detections, fused result.' },
        { kind: 'clip', src: '/media/fabric/detect.jpg', webm: '/media/fabric/detect.webm', mp4: '/media/fabric/detect.mp4', caption: 'The anomaly branch running live — defects flare on the heatmap as the cloth moves under the camera.' },
        { kind: 'image', src: '/media/fabric/dashboard.jpg', caption: 'The operator dashboard: roll statistics, the defect log, and the pass/fail call.' },
        { kind: 'image', src: '/media/fabric/machine.jpg', caption: 'The inspection rig on the mill floor — camera and lighting over the fabric roll, operator PC alongside.' },
        { kind: 'image', src: '/media/fabric/result.jpg', caption: 'The live camera view with a detection boxed on moving cloth.' },
        { kind: 'image', src: '/media/ammara/textile-asia-stand.jpg', caption: 'Textile Asia 2026, Lahore Expo Centre — where the system was shown to the mills.', fit: 'contain' },
        { kind: 'image', src: '/media/ammara/magicqc-team.jpg', caption: 'The MagicQC exhibitor team on the stand at Textile Asia.' },
      ],
    },

    featured: true,
    confidential:
      'Client system. The source for the mill deployment is not public; the metrics, the floor photography and the exhibition material are what can be shown.',
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
      poster: '/media/diagrams/rag-card.svg',
      alt: 'Diagram of the retrieval pipeline: documents are ingested and chunked, embedded into a vector store, retrieved against the user question, and passed to the language model, with an OCR and detection branch feeding the same path.',
      gallery: [
        { kind: 'image', src: '/media/diagrams/rag-card.svg', caption: 'Ingest, chunk, embed, retrieve, generate — the path a client question actually takes.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/rag-pipeline.svg', caption: 'The same path in full, including the OCR and YOLOv8 branch that replaced the multi-step manual review.', fit: 'contain' },
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
      poster: '/media/diagrams/uav-card.svg',
      alt: 'Diagram of the UAV perception path: a live aerial video feed is passed through detection and tracking, then aggregated into a dashboard showing live detections and parking slot occupancy.',
      gallery: [
        { kind: 'image', src: '/media/diagrams/uav-card.svg', caption: 'Aerial feed to occupancy count: detect, track across frames, aggregate into a number.', fit: 'contain' },
        { kind: 'image', src: '/media/diagrams/uav-pipeline.svg', caption: 'The full perception path and the dashboard it drives. No programme imagery is shown.', fit: 'contain' },
      ],
    },

    featured: true,
    confidential:
      'Defence-adjacent work. No imagery from the programme is shown and the description does not go beyond what the CV states.',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
