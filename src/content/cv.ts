import { site, education } from './site'

// ---------------------------------------------------------------------------
// THE ONE-PAGE ATS CV.
//
// This is the single source for /cv/print and therefore for the downloadable
// public/media/Ammara_Noor_CV.pdf that scripts/build-cv.mjs renders from it.
// Contact details and links are imported from site.ts so they can never drift
// apart from the website.
//
// Why this file exists separately from site.ts: the site is written in prose
// ("I collect the data, train the model, and install it on the line"), and an
// applicant tracking system does not read prose — it reads section headings,
// dates in a standard format, and keyword-dense skill lines. Same facts, a
// different register. Every claim still traces to the three source CVs in
// docs/drive/ammara/.
//
// ATS RULES BAKED INTO THE RENDERER (src/app/cv/print/page.tsx) — do not
// "improve" the layout past them:
//   - one column, no tables, no text boxes, no images, no icons, no columns
//   - standard headings: Summary / Technical Skills / Experience / Projects /
//     Education / Achievements & Leadership
//   - real selectable text, standard font stack, black on white
//   - dates as "Feb 2026 – Jun 2026", consistently
//   - one page. If something has to give, it is a project bullet, never a
//     keyword line.
// ---------------------------------------------------------------------------

export const cv = {
 name: site.name,
 headline: 'AI / ML Engineer - Computer Vision, LLM & RAG Systems, Production ML',
 contact: [
  site.location,
  site.phone,
  site.email,
  'linkedin.com/in/ammaranoorkhan',
  'github.com/ammaran620-de',
 ],
 availability: 'Available immediately | Open to remote & onsite',

 summary:
  'AI/ML engineer who takes systems from data collection through to production deployment. Built and commissioned two systems on a live textile floor: an AI garment size measurement station, and a fabric defect detector at 95% accuracy on a ~1,600-image dataset I collected on-site. Shipped production RAG pipelines into live client applications, and reproduced PatchCore from the original paper to 99.56% AUROC on MVTec AD. 1st place, ICAT National Robotics Competition 2025.',

 skills: [
  {
   label: 'Computer Vision',
   items:
    'Object detection (YOLOv8), image classification, segmentation, anomaly detection (PatchCore), OCR, object tracking, real-time video analytics, image processing, dataset collection and labelling, Roboflow',
  },
  {
   label: 'Machine Learning',
   items:
    'PyTorch, TensorFlow, scikit-learn, Hugging Face, Ultralytics, OpenCV, NumPy, Pandas, training, fine-tuning, transfer learning, evaluation (AUROC, mAP, F1, precision/recall), MLflow experiment tracking, threshold calibration',
  },
  {
   label: 'LLM & Generative AI',
   items:
    'Retrieval-augmented generation (RAG), embeddings, vector search, chunking and retrieval strategy, prompt engineering, LLM API integration, structured outputs, document processing',
  },
  {
   label: 'MLOps & Deployment',
   items:
    'FastAPI, Flask, REST API design, Docker, Linux, Git, ONNX export, latency profiling, inference optimisation, drift monitoring, on-site installation, live camera and hardware integration',
  },
  {
   label: 'Backend, Frontend & Languages',
   items:
    'Node.js, Express.js, MySQL, SQLite, role-based authentication, React.js, Next.js, operator dashboards | Python, JavaScript (ES6+), SQL, C/C++ | English (professional working), Urdu (native)',
  },
 ],

 experience: [
  {
   title: 'AI / Computer Vision Engineer (Part-Time)',
   org: 'Robionix Technologies',
   location: 'Lahore, Pakistan',
   dates: 'Feb 2026 - Jun 2026',
   bullets: [
    'Built and deployed MagicQC, an AI-based automated garment size measurement system: a fixed-camera station that segments the garment, derives seven points of measure and calls each against the buyer tolerance for one PASS/FAIL verdict. Shipped as a floor desktop app plus a React/Node web app managing brands, article types, operators and purchase orders, and commissioned on the production line at MEB Karachi.',
    'Built a separate fabric defect detection system for the mill floor: YOLOv8 across three known defect classes fused with PatchCore anomaly detection for unseen defects, reaching 95% accuracy on a held-out test set.',
    'Collected and labelled the ~1,600-image defect dataset on-site because none existed; shipped the runtime solo - camera capture, OpenCV preprocessing, dual-model inference, Flask API, React dashboard, Dockerised - then ran operator rollout and re-tuned thresholds under production conditions to cut false positives.',
    'Exhibited MagicQC at the 32nd Textile Asia Expo - Nishat Mills, Gul Ahmed and Sapphire requested evaluations; presented the technology and business case at a national industry open house.',
   ],
  },
  {
   title: 'Full-Stack AI Developer',
   org: 'Evolvian Softwares',
   location: 'Lahore, Pakistan',
   dates: 'Aug 2025 - Jan 2026',
   bullets: [
    'Shipped production RAG pipelines end to end - document ingestion, embeddings, vector retrieval, LLM generation - into live client applications, with the REST APIs and React dashboards (role-based auth, live updates) that served them.',
    'Rebuilt chunking and retrieval strategy after diagnosing why standard metrics did not predict real failures, raising output consistency across messy client documents.',
    'Collapsed a multi-step manual review into one automated pipeline by chaining LLM text processing, OCR and YOLOv8 detection; owned features from client requirement to deployed release.',
   ],
  },
  {
   title: 'AI & UAV Engineering Intern',
   org: 'National Development Complex (NESCOM)',
   location: 'Islamabad, Pakistan',
   dates: 'Jul 2025 - Sep 2025',
   bullets: [
    'Built a UAV surveillance system performing person tracking and vehicle detection on live aerial video feeds.',
    'Delivered a parking operations dashboard turning the raw detection stream into live slot occupancy and searchable footage, filterable by person, vehicle, face or plate.',
   ],
  },
 ],

 projects: [
  {
   title: 'Industrial Anomaly Detection - MLOps Pipeline',
   stack: 'PyTorch, PatchCore, MLflow, FastAPI, Docker, ONNX',
   link: 'github.com/ammaran620-de/industrial-anomaly-detection-mlops',
   bullets: [
    'Implemented PatchCore from the original paper - frozen WideResNet-50 features, patch memory bank, 1% greedy k-center coreset, trained on defect-free images only. 99.56% AUROC on MVTec AD carpet: 87 of 89 defects caught, 26 of 28 good pieces passed, precision/recall/F1 all 0.9775 at the 95th-percentile threshold.',
    'Served through FastAPI with MLflow-tracked runs, Docker Compose and a drift signal; profiled 535 ms/image on CPU against a 33 ms budget and documented the ONNX/INT8 path.',
   ],
  },
  {
   title: 'RallyLens - Sports Analytics',
   stack: 'Python, YOLO, OpenCV, object tracking, pose estimation',
   link: '',
   bullets: [
    'Player and ball tracking on ordinary handheld coaching footage: identities held through the rally, ball speed derived from the recovered track, shot and rally counts computed rather than tagged by hand. Delivers an annotated video plus a dashboard of per-player counts, ball-speed history and an event timeline.',
   ],
  },
 ],

 education: {
  degree: education.degree,
  org: `${education.institution}, ${education.location}`,
  dates: '2022 - 2026',
  detail: `${education.grade} | Coursework: machine learning, deep learning, computer vision, databases, data structures and algorithms, OOP.`,
 },

 achievements: [
  '1st Place, ICAT National Robotics Competition 2025 | Runner-Up, NAIS 2025 National AI Seminar | Millennium Fellow, United Nations Academic Impact Programme.',
  'Chair, IEEE Women in Engineering, NUTECH Student Branch | Chief Coordinator, NUTECH Student Council | Ambassador, 6th International Student Convention & Expo 2026, Islamabad.',
 ],
} as const
