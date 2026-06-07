export const contact = {
  email: "provincegeorge412@gmail.com",
  linkedin: "https://www.linkedin.com/in/george-province-7007b4238/",
  github: "https://github.com/georgepr0xy",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Build", href: "#build-systems" },
  { label: "Contact", href: "#contact" },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces, motion systems, and the product surfaces that make complex state legible.",
    position: "left-1/2 top-[4%] -translate-x-1/2",
    anchor: { x: 250, y: 60 },
    path: "M250 250 L250 60",
    skills: [
      { id: "react", label: "React", x: 218, y: 28 },
      { id: "nextjs", label: "Next.js", x: 250, y: 18 },
      { id: "tailwind", label: "Tailwind", x: 282, y: 28 },
      { id: "gsap", label: "GSAP", x: 205, y: 48 },
      { id: "motion", label: "Framer Motion", x: 295, y: 48 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, services, auth flows, and the contracts that keep distributed systems dependable.",
    position: "right-[1%] top-[29%]",
    anchor: { x: 420, y: 180 },
    path: "M250 250 L420 180",
    skills: [
      { id: "flask", label: "Flask", x: 448, y: 148 },
      { id: "fastapi", label: "FastAPI", x: 468, y: 172 },
      { id: "nodejs", label: "Node.js", x: 458, y: 198 },
      { id: "laravel", label: "Laravel", x: 432, y: 210 },
      { id: "go", label: "Go", x: 408, y: 192 },
      { id: "graphql", label: "GraphQL", x: 438, y: 162 },
    ],
  },
  {
    id: "ai",
    label: "AI",
    description: "Applied intelligence layers — retrieval, embeddings, and model orchestration wired into product flows.",
    position: "left-[1%] top-[29%]",
    anchor: { x: 80, y: 180 },
    path: "M250 250 L80 180",
    skills: [
      { id: "openai", label: "OpenAI", x: 52, y: 148 },
      { id: "langchain", label: "LangChain", x: 32, y: 172 },
      { id: "rag", label: "RAG", x: 42, y: 198 },
      { id: "embeddings", label: "Embeddings", x: 68, y: 210 },
      { id: "huggingface", label: "HuggingFace", x: 62, y: 162 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "Containerized runtimes, deployment pipelines, and the infrastructure that carries software to production.",
    position: "right-[9%] bottom-[5%]",
    anchor: { x: 360, y: 428 },
    path: "M250 250 L360 428",
    skills: [
      { id: "docker", label: "Docker", x: 388, y: 452 },
      { id: "cloudrun", label: "Cloud Run", x: 408, y: 468 },
      { id: "cicd", label: "CI/CD", x: 378, y: 472 },
      { id: "linux", label: "Linux", x: 352, y: 458 },
    ],
  },
  {
    id: "database",
    label: "Database",
    description: "Storage layers, caches, and analytical engines selected for the access patterns each system needs.",
    position: "left-[9%] bottom-[5%]",
    anchor: { x: 140, y: 428 },
    path: "M250 250 L140 428",
    skills: [
      { id: "mysql", label: "MySQL", x: 112, y: 452 },
      { id: "clickhouse", label: "ClickHouse", x: 92, y: 468 },
      { id: "bigquery", label: "BigQuery", x: 122, y: 472 },
      { id: "redis", label: "Redis", x: 148, y: 458 },
      { id: "vector", label: "Vector DBs", x: 102, y: 442 },
    ],
  },
];

export type ProjectLayer = {
  id: string;
  label: string;
  meta: string;
  className: string;
  services?: string[];
};

export type ProjectCaseStudy = {
  id: string;
  index: string;
  title: string;
  category: string;
  overview: string;
  architecture: {
    caption: string;
    status: string;
    layers: ProjectLayer[];
    connectors: string[];
    flows: { id: string; path: string; delay: string }[];
  };
  techStack: string[];
  challenges: string[];
  results: { label: string; value: string }[];
};

export const featuredProjects: ProjectCaseStudy[] = [
  {
    id: "ai-chatbot",
    index: "01",
    title: "AI Chatbot Platform",
    category: "AI systems",
    overview:
      "A retrieval-augmented chatbot platform that grounds every response in indexed product knowledge. Users submit questions through a web interface; the system retrieves relevant context, orchestrates model calls, and streams answers back with source attribution.",
    architecture: {
      caption: "RAG pipeline / conversational inference",
      status: "STREAMING",
      layers: [
        { id: "user", label: "User Interface", meta: "NEXT.JS / CHAT UI", className: "left-1/2 top-[4%] w-[52%] -translate-x-1/2" },
        { id: "gateway", label: "API Gateway", meta: "AUTH / RATE LIMIT", className: "left-1/2 top-[18%] w-[58%] -translate-x-1/2" },
        {
          id: "rag",
          label: "RAG Orchestrator",
          meta: "LANGCHAIN / EMBEDDINGS",
          className: "left-1/2 top-[34%] w-[72%] -translate-x-1/2",
          services: ["RETRIEVE", "RANK", "GENERATE"],
        },
        { id: "vector", label: "Vector Store", meta: "SEMANTIC INDEX", className: "left-1/2 top-[52%] w-[64%] -translate-x-1/2" },
        { id: "llm", label: "LLM Provider", meta: "OPENAI / COMPLETIONS", className: "left-1/2 top-[68%] w-[56%] -translate-x-1/2" },
        { id: "cache", label: "Response Cache", meta: "REDIS / SESSION STATE", className: "left-1/2 top-[84%] w-[48%] -translate-x-1/2" },
      ],
      connectors: [
        "M200 52 V72",
        "M200 112 V132",
        "M200 192 V212",
        "M200 272 V292",
        "M200 352 V372",
        "M200 432 V452",
      ],
      flows: [
        { id: "query", path: "M200 52 V452", delay: "0s" },
        { id: "context", path: "M200 272 L120 272 L120 212 L200 212", delay: "-1.4s" },
        { id: "response", path: "M200 432 V52", delay: "-2.6s" },
      ],
    },
    techStack: ["Next.js", "FastAPI", "LangChain", "OpenAI", "Vector DB", "Redis", "Docker"],
    challenges: [
      "Designing chunking and retrieval strategies that balance recall with response latency.",
      "Managing token budgets across retrieval context and generation without losing answer quality.",
      "Streaming partial responses while maintaining citation accuracy to source documents.",
    ],
    results: [
      { label: "Response mode", value: "Streaming with source attribution" },
      { label: "Retrieval", value: "Semantic search over product knowledge base" },
      { label: "Latency", value: "Sub-3s first token on typical queries" },
    ],
  },
  {
    id: "insurance-leads",
    index: "02",
    title: "Insurance Lead Management System",
    category: "CRM platform",
    overview:
      "An end-to-end lead operations platform for insurance teams. Incoming leads are validated, scored, routed to agents, and tracked through conversion — with real-time status updates across dashboards and assignment queues.",
    architecture: {
      caption: "Lead routing / agent assignment flow",
      status: "ACTIVE",
      layers: [
        { id: "intake", label: "Lead Intake", meta: "WEB FORMS / API", className: "left-1/2 top-[4%] w-[54%] -translate-x-1/2" },
        { id: "api", label: "Laravel API", meta: "REST / VALIDATION", className: "left-1/2 top-[20%] w-[62%] -translate-x-1/2" },
        {
          id: "engine",
          label: "Assignment Engine",
          meta: "RULES / SCORING",
          className: "left-1/2 top-[36%] w-[76%] -translate-x-1/2",
          services: ["SCORE", "ROUTE", "QUEUE"],
        },
        { id: "db", label: "MySQL", meta: "LEADS / AGENTS / HISTORY", className: "left-1/2 top-[54%] w-[66%] -translate-x-1/2" },
        { id: "ws", label: "WebSocket Layer", meta: "LIVE STATUS PUSH", className: "left-1/2 top-[70%] w-[58%] -translate-x-1/2" },
        { id: "dashboard", label: "Agent Dashboard", meta: "REACT / QUEUE VIEW", className: "left-1/2 top-[86%] w-[52%] -translate-x-1/2" },
      ],
      connectors: [
        "M200 48 V68",
        "M200 128 V148",
        "M200 208 V228",
        "M200 288 V308",
        "M200 368 V388",
        "M200 448 V468",
      ],
      flows: [
        { id: "lead", path: "M200 48 V308", delay: "0s" },
        { id: "assign", path: "M200 208 L300 208 L300 388 L200 388", delay: "-1.8s" },
        { id: "notify", path: "M200 368 V468", delay: "-3s" },
      ],
    },
    techStack: ["React", "Laravel", "MySQL", "WebSockets", "Redis", "JWT", "REST APIs"],
    challenges: [
      "Building fair lead distribution logic that respects agent capacity and territory rules.",
      "Keeping agent dashboards synchronized without polling overhead on high lead volume.",
      "Maintaining audit trails across reassignment, status changes, and conversion events.",
    ],
    results: [
      { label: "Routing", value: "Automated agent assignment with rule engine" },
      { label: "Visibility", value: "Real-time lead status across all agents" },
      { label: "Tracking", value: "Full lifecycle history per lead record" },
    ],
  },
  {
    id: "lead-bidding",
    index: "03",
    title: "Real-Time Lead Bidding Platform",
    category: "Event-driven systems",
    overview:
      "A real-time marketplace where incoming leads from ad platforms are auctioned to buyers within seconds. Events enter through an ingestion layer, pass through a bidding engine, and resolve to the highest bidder with live UI updates across all connected buyers.",
    architecture: {
      caption: "Live auction / event-driven bidding",
      status: "LIVE",
      layers: [
        { id: "sources", label: "Lead Sources", meta: "FACEBOOK / PIXEL FEEDS", className: "left-1/2 top-[4%] w-[58%] -translate-x-1/2" },
        { id: "ingest", label: "Ingestion Service", meta: "NODE.JS / VALIDATION", className: "left-1/2 top-[18%] w-[64%] -translate-x-1/2" },
        { id: "bus", label: "Event Bus", meta: "REDIS PUB/SUB", className: "left-1/2 top-[34%] w-[56%] -translate-x-1/2" },
        {
          id: "bid",
          label: "Bidding Engine",
          meta: "TIMER / MATCH LOGIC",
          className: "left-1/2 top-[50%] w-[78%] -translate-x-1/2",
          services: ["OPEN", "BID", "RESOLVE"],
        },
        { id: "ws", label: "WebSocket Gateway", meta: "BUYER CONNECTIONS", className: "left-1/2 top-[66%] w-[62%] -translate-x-1/2" },
        { id: "buyers", label: "Buyer Dashboards", meta: "REACT / LIVE FEED", className: "left-1/2 top-[84%] w-[54%] -translate-x-1/2" },
      ],
      connectors: [
        "M200 46 V66",
        "M200 114 V134",
        "M200 182 V202",
        "M200 250 V270",
        "M200 318 V338",
        "M200 386 V406",
      ],
      flows: [
        { id: "lead-event", path: "M200 46 V270", delay: "0s" },
        { id: "bid-round", path: "M200 250 L320 250 L320 338 L200 338", delay: "-1.2s" },
        { id: "resolve", path: "M200 386 V46", delay: "-2.4s" },
      ],
    },
    techStack: ["Node.js", "React", "Redis", "WebSockets", "MySQL", "OAuth", "Docker"],
    challenges: [
      "Resolving race conditions when multiple buyers submit bids within the same auction window.",
      "Guaranteeing sub-second event delivery to all connected buyer clients at scale.",
      "Handling lead source API failures without dropping events or duplicating auctions.",
    ],
    results: [
      { label: "Auction window", value: "Sub-5s lead-to-resolution cycle" },
      { label: "Delivery", value: "Event-driven push to all buyer clients" },
      { label: "Reliability", value: "Idempotent ingestion with dedup guards" },
    ],
  },
  {
    id: "pixel-logger",
    index: "04",
    title: "Pixel Event Logger",
    category: "Analytics infrastructure",
    overview:
      "A client-side tracking pixel paired with a high-throughput ingestion pipeline. Browser events are captured, batched, validated, and written to an analytical store — powering attribution reporting without impacting page performance.",
    architecture: {
      caption: "Event capture / analytics ingestion",
      status: "INGESTING",
      layers: [
        { id: "browser", label: "Browser / Page", meta: "CLIENT-SIDE PIXEL", className: "left-1/2 top-[4%] w-[50%] -translate-x-1/2" },
        { id: "collector", label: "Event Collector", meta: "FASTAPI / INGEST", className: "left-1/2 top-[20%] w-[60%] -translate-x-1/2" },
        { id: "buffer", label: "Stream Buffer", meta: "REDIS / BATCH QUEUE", className: "left-1/2 top-[36%] w-[56%] -translate-x-1/2" },
        {
          id: "processor",
          label: "Event Processor",
          meta: "VALIDATE / ENRICH",
          className: "left-1/2 top-[52%] w-[72%] -translate-x-1/2",
          services: ["PARSE", "ENRICH", "WRITE"],
        },
        { id: "warehouse", label: "ClickHouse", meta: "COLUMNAR STORE", className: "left-1/2 top-[68%] w-[64%] -translate-x-1/2" },
        { id: "bi", label: "Attribution Dashboard", meta: "BIGQUERY / REPORTING", className: "left-1/2 top-[84%] w-[58%] -translate-x-1/2" },
      ],
      connectors: [
        "M200 46 V66",
        "M200 126 V146",
        "M200 206 V226",
        "M200 286 V306",
        "M200 366 V386",
        "M200 446 V466",
      ],
      flows: [
        { id: "event", path: "M200 46 V386", delay: "0s" },
        { id: "batch", path: "M200 206 L100 206 L100 306 L200 306", delay: "-1.6s" },
        { id: "report", path: "M200 446 V84", delay: "-3.2s" },
      ],
    },
    techStack: ["JavaScript", "FastAPI", "Redis", "ClickHouse", "BigQuery", "Docker", "Linux"],
    challenges: [
      "Keeping the pixel script under 2KB while supporting rich event payloads and batching.",
      "Absorbing traffic spikes from ad campaigns without backpressure on the ingestion API.",
      "Designing schema evolution for event types without breaking downstream attribution queries.",
    ],
    results: [
      { label: "Throughput", value: "High-volume event ingestion with batching" },
      { label: "Footprint", value: "Minimal client-side script impact" },
      { label: "Reporting", value: "Attribution dashboards on analytical store" },
    ],
  },
  {
    id: "laptop-predictor",
    index: "05",
    title: "Laptop Price Predictor",
    category: "ML application",
    overview:
      "A machine learning application that estimates laptop resale prices from hardware specifications. Users submit device attributes through a web form; a feature pipeline transforms inputs, a trained model produces a price estimate, and results display with confidence context.",
    architecture: {
      caption: "Inference pipeline / price prediction",
      status: "INFERENCE",
      layers: [
        { id: "form", label: "Input Form", meta: "REACT / SPECS UI", className: "left-1/2 top-[4%] w-[50%] -translate-x-1/2" },
        { id: "api", label: "Flask API", meta: "REST / VALIDATION", className: "left-1/2 top-[22%] w-[58%] -translate-x-1/2" },
        {
          id: "features",
          label: "Feature Pipeline",
          meta: "ENCODE / NORMALIZE",
          className: "left-1/2 top-[40%] w-[70%] -translate-x-1/2",
          services: ["PARSE", "ENCODE", "SCALE"],
        },
        { id: "model", label: "ML Model", meta: "TRAINED REGRESSOR", className: "left-1/2 top-[58%] w-[60%] -translate-x-1/2" },
        { id: "store", label: "Model Registry", meta: "VERSIONED ARTIFACTS", className: "left-1/2 top-[74%] w-[52%] -translate-x-1/2" },
        { id: "result", label: "Price Output", meta: "ESTIMATE / CONFIDENCE", className: "left-1/2 top-[88%] w-[48%] -translate-x-1/2" },
      ],
      connectors: [
        "M200 44 V64",
        "M200 132 V152",
        "M200 220 V240",
        "M200 308 V328",
        "M200 396 V416",
        "M200 464 V484",
      ],
      flows: [
        { id: "input", path: "M200 44 V328", delay: "0s" },
        { id: "transform", path: "M200 220 L300 220 L300 328 L200 328", delay: "-1.5s" },
        { id: "output", path: "M200 464 V44", delay: "-2.8s" },
      ],
    },
    techStack: ["Flask", "React", "Python", "scikit-learn", "Pandas", "MySQL", "Docker"],
    challenges: [
      "Engineering feature encoding that handles missing specs and out-of-range hardware values.",
      "Versioning model artifacts so predictions remain reproducible across deployments.",
      "Presenting estimates with enough context for users to trust results on edge-case devices.",
    ],
    results: [
      { label: "Prediction", value: "Real-time price estimates from device specs" },
      { label: "Pipeline", value: "Reproducible feature encoding and model serving" },
      { label: "UX", value: "Instant feedback with confidence context" },
    ],
  },
];

export const capabilities = [
  {
    code: "SYS.01",
    title: "Product systems",
    description:
      "Interfaces built around real workflows, not decorative screens. Clear states, durable patterns, measurable outcomes.",
    tools: "React / Next.js / TypeScript",
  },
  {
    code: "SYS.02",
    title: "Platform architecture",
    description:
      "Services and infrastructure designed for operability from day one, with observability treated as a feature.",
    tools: "Node.js / Go / AWS",
  },
  {
    code: "SYS.03",
    title: "Engineering direction",
    description:
      "Technical strategy that connects product goals to sensible architecture, delivery plans, and team velocity.",
    tools: "Systems / Mentoring / Delivery",
  },
];

export const buildSystemStages = [
  {
    id: "idea",
    index: "01",
    label: "Idea",
    chapter: "SEQ.01",
    y: 72,
    sketchMeta: "WHITEBOARD / CONSTRAINTS",
    productionMeta: "REQUIREMENTS LOCKED",
    narration: "The problem is named, bounded, and written down before any infrastructure exists.",
    log: "Problem framed — constraints captured on whiteboard.",
    services: ["SCOPE", "RISKS"],
  },
  {
    id: "architecture",
    index: "02",
    label: "Architecture",
    chapter: "SEQ.02",
    y: 172,
    sketchMeta: "BOX DIAGRAM / DRAFT",
    productionMeta: "SERVICE BOUNDARIES DEFINED",
    narration: "Boxes become contracts. Data paths, ownership lines, and failure domains are drawn.",
    log: "Topology drafted — service boundaries assigned.",
    services: ["API", "EVENTS", "DATA"],
  },
  {
    id: "development",
    index: "03",
    label: "Development",
    chapter: "SEQ.03",
    y: 272,
    sketchMeta: "STUBS / INTERFACES",
    productionMeta: "SERVICES IMPLEMENTED",
    narration: "Interfaces harden into running code. Tests guard the contracts architecture defined.",
    log: "Services compiled — integration tests passing.",
    services: ["BUILD", "TEST", "REVIEW"],
  },
  {
    id: "deployment",
    index: "04",
    label: "Deployment",
    chapter: "SEQ.04",
    y: 372,
    sketchMeta: "MANUAL RELEASE",
    productionMeta: "CI/CD PIPELINE ACTIVE",
    narration: "Containers ship through automated pipelines. Releases become repeatable, not heroic.",
    log: "Pipeline triggered — artifact deployed to runtime.",
    services: ["BUILD", "SHIP", "ROLL"],
  },
  {
    id: "monitoring",
    index: "05",
    label: "Monitoring",
    chapter: "SEQ.05",
    y: 472,
    sketchMeta: "LOG TAILING",
    productionMeta: "OBSERVABILITY ONLINE",
    narration: "Traces, metrics, and alerts surface what the system is doing — not what we hope it does.",
    log: "Telemetry connected — dashboards receiving signal.",
    services: ["TRACE", "METRIC", "ALERT"],
  },
  {
    id: "optimization",
    index: "06",
    label: "Optimization",
    chapter: "SEQ.06",
    y: 572,
    sketchMeta: "POST-INCIDENT NOTES",
    productionMeta: "FEEDBACK LOOP CLOSED",
    narration: "Production data flows back into design. Latency drops, costs shrink, reliability compounds.",
    log: "Optimization cycle complete — system evolved.",
    services: ["PROFILE", "TUNE", "ITERATE"],
  },
];

export const principles = [
  ["01", "Clarity over cleverness", "The best system is the one the team can understand, operate, and extend."],
  ["02", "Make state visible", "Interfaces should explain what happened, what is happening, and what comes next."],
  ["03", "Build for change", "Good architecture protects momentum without pretending the future is predictable."],
  ["04", "Details are infrastructure", "Naming, spacing, error states, and documentation compound into trust."],
];
