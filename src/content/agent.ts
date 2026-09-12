import { site } from "./site";

// ---------------------------------------------------------------------------
// Knowledge base for the site's chat widget.
//
// Every answer is a fixed string written in Ammara's voice — first person,
// plain, specific. It CANNOT hallucinate because there is no model in the
// loop; the widget matches a question to one of these topics and returns the
// text verbatim.
//
// HARD RULE (also binds any future LLM tier): every claim here traces to
// src/content/projects.ts, src/content/site.ts or one of the source CVs. No
// invented employer, metric, date or personal detail. No salary figure, no
// notice period and no availability promise beyond "available immediately",
// which is what the CV states.
// ---------------------------------------------------------------------------

export type AgentTopic = {
  id: string;
  /** Short label on the suggestion chip. `null` = matchable but not offered as a chip. */
  chip: string | null;
  /** Keywords for free-text matching. Longer / rarer phrases score higher. */
  patterns: string[];
  /** The reply — Ammara's voice, first person, honest. */
  answer: string;
  cta?: { label: string; href: string };
};

export const agentTopics: AgentTopic[] = [
  {
    id: "build",
    chip: "What do you build?",
    patterns: ["what do you build", "what do you make", "services", "what do you offer", "specialise", "specialize", "what kind of work", "capabilities", "computer vision", "cv work", "what do you do"],
    answer:
      "Computer vision systems that run somewhere real, and the retrieval systems around them. Detection, classification, segmentation and anomaly detection — trained on data I usually have to go and collect myself — then served through an API with a dashboard the operator actually uses. On the language side: ingestion, embeddings, vector retrieval and generation, wired into applications people already work in. I do the deployment too: the camera integration, the install, and the rollout with the people who have to live with it.",
    cta: { label: "See the work", href: "#work" },
  },
  {
    id: "proof",
    chip: "Has any of it shipped?",
    patterns: ["proof", "real", "results", "does it ship", "actually work", "deployed", "in production", "live", "evidence", "case study", "shipped"],
    answer:
      "Two of them, both installed on a working floor at Robionix. MagicQC is an AI-based garment size measurement station: it derives every point of measure from the garment and calls it against the buyer's tolerance, and it ships as a desktop app on the floor plus the web system of record behind it. Separately, the fabric defect detector runs at 95% accuracy on a held-out test set — I collected and labelled the ~1,600-image dataset on the mill floor because none existed, trained YOLOv8 for three defect classes and added PatchCore for the ones nobody had labelled. MagicQC was shown at the 32nd Textile Asia Expo and Nishat Mills, Gul Ahmed and Sapphire asked for evaluations afterwards.",
    cta: { label: "See the work", href: "#work" },
  },
  {
    id: "hire",
    chip: "Are you available?",
    patterns: ["available", "availability", "hiring", "hire you", "job", "role", "position", "full-time", "fulltime", "full time", "employment", "recruit", "join", "notice period", "start date", "when can you start", "open to work"],
    answer:
      "Yes — available immediately for full-time AI/ML engineering roles. I am based in Islamabad and open to remote or onsite. I finish BS Computer Engineering at NUTECH in 2026 and have been working in industry alongside it since 2025. Email is the fastest way to reach me.",
    cta: { label: "Email Ammara", href: `mailto:${site.email}` },
  },
  {
    id: "stack",
    chip: "What's your stack?",
    patterns: ["your stack", "tech stack", "what tech", "what do you use", "which tools", "tools do you", "what language", "frameworks", "pytorch", "yolo", "tensorflow", "opencv", "libraries", "toolchain"],
    answer:
      "PyTorch and YOLOv8 for the models, PatchCore for anomaly detection, OpenCV for everything between the camera and the model. FastAPI or Flask to serve, Docker to ship, MLflow to track runs. React and Next.js for the dashboards, Node and MySQL behind them. Python is my main language, then JavaScript and SQL, with C/C++ from coursework. Evaluation is AUROC, mAP, precision/recall and latency profiling — I would rather know where a model fails than quote its best number.",
  },
  {
    id: "vision-vs-llm",
    chip: "Vision or LLMs?",
    patterns: ["vision or llm", "rag", "llm", "language model", "genai", "generative", "embeddings", "vector", "retrieval", "chatbot", "which are you better at", "deeper"],
    answer:
      "Vision is deeper — that is where most of my production hours and all of my measurable results are. The LLM work is real but younger: at Evolvian I shipped RAG pipelines into live client applications, rebuilt the chunking and retrieval strategy after working out why the standard metrics were not predicting the failures users actually hit, and chained LLM text processing with OCR and YOLOv8 to replace a multi-step manual review. I would rather tell you which is which now than have you find out later.",
  },
  {
    id: "anomaly",
    chip: null,
    patterns: ["patchcore", "anomaly", "auroc", "mvtec", "unsupervised", "defect detection", "research", "paper"],
    answer:
      "I implemented PatchCore from the original paper rather than pulling a checkpoint — frozen WideResNet-50 features, 3×3 patch pooling, a memory bank built from defect-free images only, cut to 1-5% with greedy k-center coreset subsampling. It reaches 99.56% AUROC on MVTec AD carpet: 87 of 89 defects caught, 26 of 28 good pieces passed. Both misses were thread defects, which makes sense — a stray thread is thin and low-contrast where a hole destroys the texture. It runs at 535 ms per image on CPU against the 33 ms a 30 FPS line needs, and that gap is documented rather than hidden.",
    cta: { label: "Read the case study", href: "/work/anomaly-detection-mlops" },
  },
  {
    id: "deployment",
    chip: null,
    patterns: ["deploy", "deployment", "on site", "on-site", "field", "install", "rollout", "operators", "factory", "mill", "hardware", "camera", "integration"],
    answer:
      "On-site is the part I actually like. For the fabric line that meant going to the mill, collecting and labelling the dataset on the production floor, installing the camera and the system, and working with the operators through rollout — then re-tuning thresholds against real conditions to cut false positives, because an inspector who stops trusting the alarm just ignores it. I am comfortable in the field, not only at a desk.",
  },
  {
    id: "projects",
    chip: null,
    patterns: ["best project", "favourite project", "favorite project", "which project", "strongest", "magicqc", "fabric", "uav", "drone", "nescom", "textile"],
    answer:
      "MagicQC and the fabric defect detector are the ones to look at if you want to know whether I ship — two separate systems, both commissioned on a working floor. The anomaly-detection pipeline is the one to look at if you want to know how I think: PatchCore rebuilt from the paper with an honest evaluation, and the repository is public. The UAV work at NESCOM was person tracking and vehicle detection on live aerial video, plus the parking dashboard that turned it into a number an operator could use.",
    cta: { label: "See the work", href: "#work" },
  },
  {
    id: "who",
    chip: null,
    patterns: ["who are you", "who is ammara", "background", "about you", "experience", "cv", "resume", "education", "study", "degree", "university", "are you a bot", "what are you", "nutech"],
    answer:
      "I'm Pixel, the assistant for Ammara Noor's portfolio — I answer from her real record, nothing invented. Ammara is an AI / ML engineer in Islamabad: computer vision and LLM systems at Robionix and Evolvian, a UAV perception internship at NDC/NESCOM, and BS Computer Engineering at NUTECH (CGPA 3.44/4.00, class of 2026). She chairs IEEE Women in Engineering at NUTECH and is chief coordinator of the student council.",
    cta: { label: "Full CV", href: site.links.cv },
  },
  {
    id: "leadership",
    chip: null,
    patterns: ["ieee", "wie", "women in engineering", "leadership", "council", "society", "volunteer", "community", "millennium", "fellowship", "ambassador"],
    answer:
      "Chair of IEEE Women in Engineering at the NUTECH student branch and Chief Coordinator of the NUTECH Student Council. Millennium Fellow with the United Nations Academic Impact programme, and ambassador at the 6th International Student Convention & Expo in Islamabad in May 2026. First place at the ICAT National Robotics Competition in 2025 and runner-up at the NAIS National AI Seminar the same year.",
    cta: { label: "See the proof", href: "#proof" },
  },
  {
    id: "evaluation",
    chip: "How do you know it works?",
    patterns: ["how do you know", "evaluate", "evaluation", "testing", "test", "validate", "metrics", "benchmark", "accuracy", "false positive", "threshold"],
    answer:
      "I evaluate against the failure the system exists to prevent, not the benchmark. On the anomaly pipeline the threshold sits at the 95th percentile of normal scores, because that is the rule you can apply when only normal data exists in production — and the score distributions overlap between 2.03 and 2.18, so the threshold is a genuine cost decision rather than a formality. On the fabric line it meant hunting edge cases under real production light and re-tuning to cut false positives instead of chasing a better test-set number.",
  },
  {
    id: "location",
    chip: null,
    patterns: ["timezone", "time zone", "remote", "pakistan", "lahore", "where are you", "location", "relocate", "relocation", "onsite", "hybrid"],
    answer:
      "Islamabad, Pakistan (PKT). Open to remote and onsite work either way. Most of the deployment work has been at mills and client offices, so travel is normal rather than an exception.",
  },
  {
    id: "limits",
    chip: "What can't you do?",
    patterns: ["cant do", "can't do", "cannot do", "limitation", "not do", "weakness", "bad at", "avoid", "outside your", "gaps"],
    answer:
      "I am not a data-engineering or platform team. I train and serve models and build the API and dashboard around them; I do not run a data warehouse or own a cloud estate. Docker and Linux are working-level for me, not SRE-level, and I have not run large-scale distributed training — my optimisation work has been single-node latency and export, like profiling 535 ms/image on CPU against a 33 ms budget and mapping the ONNX/INT8 path to close it. I would rather say that up front.",
  },
  {
    id: "contact",
    chip: null,
    patterns: ["contact", "email", "reach", "get in touch", "linkedin", "github", "phone", "call", "message"],
    answer:
      `Email is best: ${site.email}. LinkedIn and GitHub are both linked at the bottom of this page, and the full CV is downloadable from the CV page.`,
    cta: { label: "Email Ammara", href: `mailto:${site.email}` },
  },
];

/** Shown when nothing matches — still gives the visitor something, then the handoff. */
export const agentFallback = {
  answer:
    "I don't have a ready answer for that one, and I'd rather give you a real one than guess. Email Ammara directly and she'll reply — that's the honest route.",
  email: site.email,
};

export const agentGreeting =
  "I'm Pixel, Ammara's portfolio assistant. She's an AI/ML engineer in Islamabad — computer vision on live production lines, plus the retrieval systems and deployment around them. Ask what she builds, whether it has shipped, her stack, or whether she's available. Pick one below or type your own.";
