import { site, education } from './site'

// ---------------------------------------------------------------------------
// THE ONE-PAGE ATS CV — single source for /cv/print and therefore for
// public/media/Ammara_Noor_CV.pdf (scripts/build-cv.mjs prints it).
//
// Layout follows the Overleaf "Jake's Resume" convention recruiters recognise:
// centred name, one contact line, ruled small-caps section headings, bold role
// with right-aligned dates, italic company with right-aligned location.
//
// It stays machine-readable: one column, real text, no tables, no images, no
// icons, ASCII punctuation, ligatures off. Every project on the website is
// listed here — the site and the CV must never disagree.
//
// Keyword strategy: recruiters search for the exact titles "AI/ML Engineer",
// "Machine Learning Engineer" and "Computer Vision Engineer", so all three
// appear verbatim in the headline and summary, and every tool is named the way
// a job description names it.
// ---------------------------------------------------------------------------

export const cv = {
  name: site.name,
  headline: 'AI/ML Engineer | Computer Vision Engineer | Machine Learning Engineer',
  contact: [
    { text: site.phone },
    { text: site.email, href: `mailto:${site.email}` },
    { text: 'linkedin.com/in/ammaranoorkhan', href: site.links.linkedin },
    { text: 'github.com/ammaran620-de', href: site.links.github },
  ],
  location: 'Lahore, Pakistan | Open to remote & onsite | Available immediately',

  summary:
    'AI/ML Engineer and Computer Vision Engineer who takes machine learning systems from data collection to production deployment. Built and commissioned two computer vision systems on live textile production lines - an AI garment size measurement station and a YOLOv8 + PatchCore fabric defect detector at 95% accuracy. Shipped production RAG pipelines into client applications and reproduced PatchCore from the paper to 99.56% AUROC on MVTec AD. Hands-on across deep learning, MLOps, model deployment and on-site integration.',

  skills: [
    { label: 'Computer Vision', items: 'Object Detection (YOLOv8), Anomaly Detection (PatchCore), Image Segmentation, Image Classification, Object Tracking, Re-ID, Pose Estimation, OCR, Video Analytics, OpenCV' },
    { label: 'Machine Learning', items: 'Deep Learning, PyTorch, TensorFlow, scikit-learn, Hugging Face, Ultralytics, Transfer Learning, Fine-tuning, Model Evaluation (AUROC, mAP, F1, Precision/Recall)' },
    { label: 'LLM & GenAI', items: 'RAG, Embeddings, Vector Search, Chunking & Retrieval Strategy, Prompt Engineering, LLM API Integration, Document AI' },
    { label: 'MLOps & Deployment', items: 'FastAPI, Flask, Docker, MLflow, ONNX, REST APIs, Linux, Git, Latency Profiling, Edge & On-site Deployment' },
    { label: 'Languages & Web', items: 'Python, SQL, JavaScript, C/C++, React.js, Next.js, Node.js, Express.js, MySQL, SQLite, Electron' },
  ],

  experience: [
    {
      title: 'AI / Computer Vision Engineer',
      org: 'Robionix Technologies',
      location: 'Lahore, Pakistan',
      dates: 'Feb 2026 - Jun 2026',
      bullets: [
        'Deployed two production computer vision systems on textile lines, owning each from data collection and model training to on-site installation and operator rollout.',
        'Collected and labelled a ~1,600-image dataset on the mill floor; tuned detection thresholds under real production conditions to cut false positives.',
        'Exhibited at the 32nd Textile Asia Expo, leading to evaluation requests from Nishat Mills, Gul Ahmed and Sapphire.',
      ],
    },
    {
      title: 'Full-Stack AI Developer',
      org: 'Evolvian Softwares',
      location: 'Lahore, Pakistan',
      dates: 'Aug 2025 - Jan 2026',
      bullets: [
        'Built production RAG pipelines end to end - document ingestion, embeddings, vector retrieval, LLM generation - served via REST APIs to React dashboards with role-based auth.',
        'Rebuilt chunking and retrieval strategy after diagnosing failures standard metrics missed; automated a manual review by chaining LLM, OCR and YOLOv8.',
      ],
    },
    {
      title: 'AI & UAV Engineering Intern',
      org: 'National Development Complex (NESCOM)',
      location: 'Islamabad, Pakistan',
      dates: 'Jul 2025 - Sep 2025',
      bullets: [
        'Built UAV surveillance with person tracking and vehicle detection on live aerial video, plus a parking dashboard for live slot occupancy.',
      ],
    },
  ],

  projects: [
    {
      title: 'MagicQC - AI Garment Size Measurement',
      stack: 'PyTorch, OpenCV, Electron, React, Node.js, MySQL',
      date: '2026',
      bullets: [
        'Camera station that segments each garment, derives 7 points of measure and grades them against buyer tolerance (PASS/FAIL); desktop app plus web app for brands, operators and purchase orders; deployed at MEB Karachi.',
      ],
    },
    {
      title: 'Fabric Defect Detection',
      stack: 'YOLOv8, PatchCore, PyTorch, Flask, React, Docker',
      date: '2026',
      bullets: [
        'Fused YOLOv8 (3 defect classes) with PatchCore anomaly detection for unseen defects; 95% accuracy on a held-out set, running live on the mill floor.',
      ],
    },
    {
      title: 'Industrial Anomaly Detection - MLOps Pipeline',
      stack: 'PyTorch, PatchCore, MLflow, FastAPI, ONNX',
      date: '2026',
      bullets: [
        'PatchCore reproduced from the paper: 99.56% AUROC on MVTec AD, 87/89 defects caught, F1 0.9775; MLflow-tracked, FastAPI-served, 535 ms CPU latency profiled against a 33 ms target.',
      ],
    },
    {
      title: 'RAG Document Pipelines',
      stack: 'LLMs, Embeddings, Vector Search, OCR, FastAPI',
      date: '2025',
      bullets: [
        'Grounded question answering over client documents with cited retrieval, plus an OCR branch extracting structured fields from scanned files.',
      ],
    },
    {
      title: 'UAV Surveillance & Smart Parking',
      stack: 'YOLO, Object Tracking, Re-ID, OpenCV',
      date: '2025',
      bullets: [
        'Crowd counting with re-identification, interaction detection and a searchable parking operations dashboard (person, vehicle, face, plate).',
      ],
    },
    {
      title: 'RallyLens - Sports Analytics',
      stack: 'YOLO, Pose Estimation, Object Tracking',
      date: '2026',
      bullets: [
        'Player and ball tracking on handheld footage with ball speed, shot counts and an analytics dashboard.',
      ],
    },
  ],

  education: {
    degree: `${education.degree} | ${education.grade}`,
    org: education.institution,
    location: `${education.location}, Pakistan`,
    dates: '2022 - 2026',
    detail: 'Coursework: Machine Learning, Deep Learning, Computer Vision, Data Structures & Algorithms, Databases, OOP',
  },

  achievements: [
    '1st Place, ICAT National Robotics Competition 2025 | Runner-Up, NAIS National AI Seminar 2025',
    'Chair, IEEE Women in Engineering (NUTECH) | Chief Coordinator, NUTECH Student Council | Millennium Fellow (UN Academic Impact) | Ambassador, 6th International Student Convention 2026',
  ],
} as const
