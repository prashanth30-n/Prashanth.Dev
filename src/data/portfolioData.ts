export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: 'Completed' | 'Under active development' | 'Hackathon Finalist' | 'IARE Hacktoberfest';
  tags: string[];
  description: string;
  bullets: string[];
  githubUrl: string;
  liveUrl?: string;
  screenshots?: string[];
  bannerImage?: string;
  architectureDiagram?: string;
}

export interface StackCategory {
  number: string;
  category: string;
  items: string[];
}

export const PERSONAL_INFO = {
  name: "Prashanth Nakirekanti",
  displayName: "PRASHANTH NAKIREKANTI",
  handle: "@prashanth_n369",
  title: "Backend & Systems Engineer",
  email: "prashanthnakerikanti@gmail.com",
  phone: "+91-8919725027",
  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",
  avatarUrl: "https://avatars.githubusercontent.com/u/201189542?v=4",
  resumePath: "/resume.pdf",
  resumeDirectAsset: "/assets/aistudio/Prashanth_Nakirekanti_oct_resume_c2522847.pdf",
  links: {
    github: "https://github.com/prashanth30-n",
    linkedin: "https://www.linkedin.com/in/nakirekanti-prashanth30/",
    twitter: "https://x.com/prashanth_n369",
    email: "mailto:prashanthnakerikanti@gmail.com",
    leetcode: "https://leetcode.com/u/prashanth30-n/"
  },
  bio: "I write Go (mostly), build autonomous multi-agent systems with the AWS Strands SDK, and engineer resilient distributed backends.",
  bioSecondary: "Open source and first principles is where most of my serious work lives.",
  availability: "Available for full-time, contract, and internships in Backend Engineering, Systems, and Distributed AI Systems."
};

export const EDUCATION = {
  institution: "Gokaraju Rangaraju Institute of Engineering and Technology",
  shortName: "GRIET, Hyderabad",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  cgpa: "8.79",
  location: "Hyderabad, India",
  period: "2022 — 2026"
};

export const ACHIEVEMENTS = [
  {
    title: "IIT Hyderabad Hackathon — Top 7 Finalist",
    description: "Advanced through ideathon and 24-hour build rounds among 30+ competitive teams."
  },
  {
    title: "Data Structures & Algorithms: 400+ Problems",
    description: "Solved 400+ problems on LeetCode in Java covering trees, graphs, dynamic programming, and concurrency."
  },
  {
    title: "Building in Public on X",
    description: "Regularly documents engineering builds, architectural tradeoffs, and technical learnings for an active tech audience."
  }
];

export const STACK_CATEGORIES: StackCategory[] = [
  {
    number: "01",
    category: "Languages",
    items: ["Go", "Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"]
  },
  {
    number: "02",
    category: "Backend",
    items: ["Node.js", "Express.js", "Echo (Go)", "REST APIs", "Microservices", "JWT Auth", "Redis", "Asynq", "WebSockets"]
  },
  {
    number: "03",
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis (caching)", "SQLite"]
  },
  {
    number: "04",
    category: "AI / Agents",
    items: ["AWS Strands SDK", "AWS Bedrock", "Multi-Agent Swarm", "DAG Workflows", "Tool-Using Agents", "Ollama", "SKILL.md"]
  },
  {
    number: "05",
    category: "Cloud & DevOps",
    items: ["Docker", "AWS (Bedrock; S3)", "Azure Blob Storage", "Render", "Cloudinary", "GitHub Actions (CI/CD)", "Git", "Linux", "Postman"]
  },
  {
    number: "06",
    category: "CS Fundamentals",
    items: ["DSA (400+ LeetCode)", "DBMS", "Operating Systems", "OOP", "Computer Networks"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "pubo",
    title: "Pubo",
    subtitle: "Build-in-Public Platform",
    status: "Completed",
    tags: ["Go", "React Native (Expo)", "PostgreSQL", "Redis", "Asynq", "Echo", "Clerk", "Azure Blob Storage", "Docker"],
    description: "Built a cross-platform mobile app (Go + React Native/Expo) enabling creators to compose and cross-post content to Bluesky and LinkedIn, on a layered Handler → Service → Repository backend spanning 20+ Go packages under an idiomatic cmd/ + internal/ layout.",
    bullets: [
      "Engineered a 4-stage Echo middleware pipeline (CORS, token-bucket rate limiting at 100 req/min, UUID request-ID tracing, context enrichment), cutting production debug time by ~70% via correlated logs.",
      "Integrated Clerk JWT authentication with stateless middleware-level validation, eliminating per-request database round-trips.",
      "Built an Azure Blob Storage media pipeline for scalable image delivery across iOS/Android with SIGTERM-safe graceful shutdown."
    ],
    githubUrl: "https://github.com/prashanth30-n/Pubo",
    screenshots: [
      "https://raw.githubusercontent.com/prashanth30-n/Pubo/master/pubo_1.jpeg",
      "https://raw.githubusercontent.com/prashanth30-n/Pubo/master/pubo_2.jpeg",
      "https://raw.githubusercontent.com/prashanth30-n/Pubo/master/pubo_3.jpeg",
      "https://raw.githubusercontent.com/prashanth30-n/Pubo/master/pubo_4.jpeg"
    ],
    architectureDiagram: `Mobile App (React Native / Expo)
      │
      ▼
[ Echo API Gateway ]
      │
      ├── Middleware Pipeline [ CORS · Token-Bucket Limiter (100 req/m) · UUID Tracer · Clerk JWT ]
      │
      ▼
[ Handlers (Controllers) ]
      │
      ▼
[ Services ] ───► Bluesky API / LinkedIn API / Azure Blob Storage
      │
      ▼
[ Repositories ]
      │
      ▼
[ PostgreSQL Primary + Redis Asynq Worker Queue ]`
  },
  {
    id: "agents-architectures",
    title: "Agents and Architectures",
    subtitle: "Multi-Agent Swarms & DAG Workflows",
    status: "Under active development",
    tags: ["Python", "AWS Strands SDK", "AWS Bedrock", "Claude 3.5", "Ollama", "DAG Workflows", "Multi-Agent Swarm"],
    description: "Implemented four agent architectures with the AWS Strands SDK — a Swarm of collaborating specialists sharing memory, graph-based DAG workflows with conditional routing, and sequential chains producing structured decision memos.",
    bullets: [
      "Integrated tool use and persistent session management restoring full context across restarts.",
      "Ran agents on AWS Bedrock models and Ollama models with structured debug logging across the multi-agent graph for traceability, and structured for S3-backed session storage."
    ],
    githubUrl: "https://github.com/prashanth30-n/Agents_and_Architechtures",
    bannerImage: "/src/assets/images/agentic_cloud_engine_1794203333952.jpg",
    architectureDiagram: `User / Session Input
      │
      ▼
[ Strands Agent Orchestrator ]
      │
      ├── Memory Router [ Shared Vector Store · Session State ]
      ├── Swarm Specialist 1 (Data Miner & Tool Execution)
      ├── Swarm Specialist 2 (DAG Conditional Router)
      └── Swarm Specialist 3 (Bedrock Claude 3.5 / Ollama Synthesizer)
      │
      ▼
[ S3-Backed Persistent Session Storage & Structured Decision Memo ]`
  },
  {
    id: "skillsocket",
    title: "SkillSocket",
    subtitle: "Skill-Exchange Platform",
    status: "Completed",
    tags: ["Flutter", "Node.js/Express", "MongoDB", "Cloudinary", "Docker", "Render", "GitHub Actions"],
    description: "Shipped a full-stack skill-exchange platform (Flutter, Node.js/Express, MongoDB) featuring a Tinder-style swipe matching engine and community rooms, delivered across 3 sprints with a 4-member team.",
    bullets: [
      "Designed a modular Express backend (JWT auth, bcrypt hashing, role-based middleware, Mongoose schemas, 9+ REST endpoints) and integrated Gemini 1.5 Flash behind a circuit breaker with cached fallbacks, keeping chat available during upstream outages.",
      "Built a Cloudinary media pipeline with client-side compression, cutting payload size by ~60%, and automated CI/CD with GitHub Actions, deploying via Docker to Render to cut release time from ~20 min to ~3 min across 25+ deploys."
    ],
    githubUrl: "https://github.com/prashanth30-n/SkillSocket",
    screenshots: [
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/home.jpg",
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/chats.jpg",
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/chatbot.jpg",
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/studyroom.jpg",
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/community.jpg",
      "https://raw.githubusercontent.com/prashanth30-n/SkillSocket_AAC/main/assets/splashscreen.jpg"
    ]
  },
  {
    id: "lore",
    title: "Lore Agent",
    subtitle: "Repository Knowledge to Verified Agent Skills",
    status: "IARE Hacktoberfest",
    tags: ["TypeScript", "Python", "Ollama", "GitHub GraphQL API", "SKILL.md Standard", "AST Analysis"],
    description: "Every mature open-source repository runs on tribal unwritten rules. Lore mines closed PR review comments, extracts enforced engineering rules via open-weight models (Ollama), validates citations, and formats standard SKILL.md specs.",
    bullets: [
      "Mines closed PR reviews, commit ASTs, and issues across 50+ closed pull requests using GitHub GraphQL and REST APIs.",
      "Invented-citation verification guard ensures zero hallucinated rules by checking that every citation URL exists in mined review logs."
    ],
    githubUrl: "https://github.com/prashanth30-n/Lore",
    bannerImage: "/src/assets/images/lore_agent_neural_1794203333869.jpg"
  },
  {
    id: "ratelimiter",
    title: "Non-Blocking Go Rate Limiter",
    subtitle: "Uber-Inspired Atomic Token Bucket Engine",
    status: "Completed",
    tags: ["Go", "sync/atomic", "Concurrency", "Token Bucket", "Low Latency"],
    description: "Uber-inspired non-blocking token bucket concurrency engine using atomic compare-and-swap (sync/atomic) and nano-timestamp accounting, delivering <150ns decision latency with 0 lock contention.",
    bullets: [
      "Eliminated global mutex contention on the critical path through lock-free atomic CAS loops.",
      "Sub-microsecond per-request latency benchmarked at ~120ns/op under high concurrent Goroutine load."
    ],
    githubUrl: "https://github.com/prashanth30-n/ratelimiter"
  },
  {
    id: "url-shortener",
    title: "Distributed URL Shortener",
    subtitle: "High-Throughput Key-Value Redirect Engine",
    status: "Completed",
    tags: ["Go", "Redis", "Docker", "Base62", "REST APIs"],
    description: "High-throughput Base62 key-value redirect engine built with Go and containerized Redis with sub-millisecond lookups.",
    bullets: [
      "Collision-resistant Base62 short-code generation with O(1) in-memory Redis lookups.",
      "Containerized Docker setup with automated health checks and persistent snapshotting."
    ],
    githubUrl: "https://github.com/prashanth30-n/Url-Shorterner"
  }
];
