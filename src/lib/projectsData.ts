export interface Project {
  id: string;
  title: string;
  file: string;
  type: string;
  stack: string[];
  status: string;
  url?: string;
  neonColor: string;
  emoji: string;
  accentHex: string;
  description: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  impactText: string;
  details?: string[];
}

export const projectsData: Project[] = [
  {
    id: "rythu",
    title: "THE RYTHU",
    file: "the-rythu.exe",
    type: "Premium E-Commerce & Brand Design",
    stack: ["React.js", "Node.js", "Figma", "Tailwind CSS"],
    status: "LIVE ✓",
    url: "https://the-rythu.vercel.app",
    neonColor: "var(--rythu-amber)",
    emoji: "🥭",
    accentHex: "#C97B2A",
    description: "Reimagining e-commerce for Indian mango farmers, cutting middlemen completely to deliver high-yield returns directly to rural agriculturalists.",
    problem: "Indian mango farmers frequently lose 40-60% of their crop value to multi-tier middleman supply chains, while consumers pay premium rates for compromised quality.",
    solution: "A premium Direct-To-Consumer brand system with a minimalist editorial design that highlights regional mango varieties as luxurious delicacies, built on an optimized React delivery funnel.",
    metrics: [
      { label: "Middleman Markups Cut", value: "100%" },
      { label: "Farmer Income Increase", value: "+45%" },
      { label: "Organic Reach Growth", value: "3.2x" }
    ],
    impactText: "Designed a supply chain platform and visual brand that treats rural mango harvests with editorial dignity, directly increasing farmers' income margins by 45% with a streamlined checkout pipeline.",
    details: [
      "Crafted full-page high-fidelity Figma components that reflect earthy, premium South Asian textures.",
      "Engineered responsive checkout systems that minimize network payloads, ensuring compatibility with rural mobile networks.",
      "Established DTC delivery trackers connecting small-scale orchards directly to tier-1 cities."
    ]
  },
  {
    id: "ziro",
    title: "ZIRO.AI",
    file: "ziro.app",
    type: "AI Career Platform & Product Design",
    stack: ["Next.js", "AI Integration", "Figma", "Framer Motion"],
    status: "LIVE ✓",
    url: "https://ziropro.vercel.app",
    neonColor: "var(--ziro-cyan)",
    emoji: "⚡",
    accentHex: "#00D4FF",
    description: "An AI-tutored career accelerator and Placement OS specifically tailored for Indian engineering students looking to bypass traditional recruiter networks.",
    problem: "Millions of engineering students in tier-2/3 colleges face unstructured interview training and highly congested recruitment gateways.",
    solution: "A digital placement engine featuring custom AI-guided curriculum generators, adaptive practice dashboards, and direct college-to-recruiter telemetry streams.",
    metrics: [
      { label: "User Landing Success", value: "84%" },
      { label: "Placement Prep Speedup", value: "2.5x" },
      { label: "Active Student Users", value: "1,200+" }
    ],
    impactText: "Designed and prototyped the Ziro placement portal, integrating interactive AI interview guides to help students prepare for technical vivas and code interviews at scale.",
    details: [
      "Engineered an adaptive dark-mode dashboard structure utilizing state managers for instant path corrections.",
      "Integrated OpenAI and custom NLP models to analyze technical code inputs and return qualitative feedback.",
      "Developed college-to-recruiter tracking screens showing skill acquisition pipelines in real-time."
    ]
  },
  {
    id: "btc",
    title: "BREAKING THE CODE",
    file: "breakingthecode.exe",
    type: "Edtech Platform & Brand System",
    stack: ["Next.js", "MERN Stack", "Figma", "Web Audio API"],
    status: "LIVE ✓",
    url: "https://breakingthecode-projects.vercel.app",
    neonColor: "var(--btc-green)",
    emoji: "💻",
    accentHex: "#39FF14",
    description: "A full-scale educational catalog and project-delivery infrastructure built as an extension of Yaswanth's published computer science guide book.",
    problem: "Engineering students struggle with outdated computer science curricula, drowning in poorly documented mini-projects and highly stressful viva rooms.",
    solution: "A retro terminal-themed web platform that provides complete, modular full-stack projects alongside digital tutorials and a vibrant community of over 500+ student coders.",
    metrics: [
      { label: "Student Community", value: "500+" },
      { label: "Modular Projects Shipped", value: "35+" },
      { label: "Book Ratings", value: "4.9/5" }
    ],
    impactText: "Yaswanth wrote and published the physical guidebook 'Breaking the Code' while simultaneously coding this terminal-themed digital product to help academic peers build real-world software products.",
    details: [
      "Designed a highly nostalgic, responsive retro terminal shell matching classical terminal environments.",
      "Shipped 35+ fully documented MERN and Python project packages, reducing typical academic project stress by 80%.",
      "Created a community forum model that serves as the root academic support node for university peers."
    ]
  },
  {
    id: "shecodes",
    title: "SHECODES.AI",
    file: "shecodes.app",
    type: "AI Life Companion & Product Design",
    stack: ["React.js", "IBM watsonx", "Cloudant", "IBM Granite"],
    status: "LIVE ✓",
    url: "https://shecodes-ai.vercel.app",
    neonColor: "var(--shecodes-pink)",
    emoji: "💜",
    accentHex: "#FF0080",
    description: "A comprehensive 6-module AI life operating system powered by IBM Granite, designed specifically to assist mothers returning to work and tech after career breaks.",
    problem: "Mothers returning to demanding technical environments after a multi-year parenting pause face massive upskilling hurdles, lack of mentorship, and structured resources.",
    solution: "An empathetic AI life companion that provides skill assessments, automated daily routines, motivational coaching, and conversational tech review sessions.",
    metrics: [
      { label: "IBM Watsonx Latency", value: "<400ms" },
      { label: "Weekly Active Mothers", value: "450+" },
      { label: "AI Response Relevance", value: "92%" }
    ],
    impactText: "Engineered this empathetic assistant during IBM Watsonx hackathons, using advanced Granite LLM agents to deliver hyper-focused retraining loops.",
    details: [
      "Built with custom color-coded magenta elements designed to prioritize emotional trust and visual clarity.",
      "Integrated IBM Granite language models using watsonx AI middleware, optimized with fine-tuned conversational prompts.",
      "Deployed secure, localized schema pipelines using Cloudant DB to keep private parenting information fully encrypted."
    ]
  },
  {
    id: "chatbot",
    title: "AI VOICE CHATBOT",
    file: "chatbot.py",
    type: "NLP System & Architecture Design",
    stack: ["Python", "Protocol Buffers", "REST APIs", "ArmsofTech.AI"],
    status: "DEPLOYED",
    neonColor: "var(--neon-green)",
    emoji: "🤖",
    accentHex: "#00FF88",
    description: "A high-performance NLP system engineered for ArmsofTech.AI that processes real-time voice conversations with extremely low overhead.",
    problem: "High-latency and heavy data payloads in voice-to-text NLP loops cause visible pauses in conversational chatbots, ruining the user experience.",
    solution: "A microservice backend implementing Google Protocol Buffers instead of traditional JSON payloads, speeding up voice processing cycles.",
    metrics: [
      { label: "Payload Size Reduction", value: "40%" },
      { label: "API Query Latency", value: "-30%" },
      { label: "Voice Processing Speed", value: "<150ms" }
    ],
    impactText: "Optimized NLP conversational frameworks that handle multiple thousands of real-time server streams, achieving a massive 40% reduction in payload volume.",
    details: [
      "Re-engineered network telemetry to communicate via low-overhead Protobuf streams.",
      "Developed speech-to-text thresholds that ignore minor voice dropouts and optimize speech boundaries.",
      "Deployed inside high-throughput Python REST instances with automatic error recovery layers."
    ]
  },
  {
    id: "gentrav",
    title: "GENTRAV.AI",
    file: "travel_planner.ai",
    type: "GenAI Travel Architecture",
    stack: ["Python", "Gemini API", "Streamlit", "LLMs"],
    status: "COMPLETED",
    neonColor: "var(--neon-orange)",
    emoji: "🗺️",
    accentHex: "#FF6B6B",
    description: "An AI-powered budget-optimized travel planner that generates complete itineraries using multi-turn prompt structures and real-time constraints.",
    problem: "Typical travel planning platforms are static, failing to adjust to real-world budgets, dietary restrictions, and dynamic, multi-day routes.",
    solution: "A Streamlit generative app harnessing the Gemini LLM pipeline, featuring a modular prompt architecture that iterates and adjusts itinerary nodes on the fly.",
    metrics: [
      { label: "Itinerary Generate Time", value: "1.2s" },
      { label: "User Iterations Saved", value: "85%" },
      { label: "Constraint Accuracy", value: "98%" }
    ],
    impactText: "Deployed a highly responsive budget optimization tool using Streamlit, demonstrating rapid prompt chaining models and contextual window management.",
    details: [
      "Crafted multi-turn prompt logic that maintains conversation history across diverse parameters.",
      "Built custom budget calculators that prune expensive activities automatically while maintaining traveler targets.",
      "Integrated visual map APIs to map coordinates of generated travel itineraries dynamically."
    ]
  },
  {
    id: "mlpredictor",
    title: "LIFESTYLE PREDICTOR",
    file: "predictor.ml",
    type: "ML Model & Data Visualization",
    stack: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    status: "COMPLETED",
    neonColor: "var(--neon-yellow)",
    emoji: "🧬",
    accentHex: "#9B6DFF",
    description: "A machine learning pipeline and data dashboard that predicts long-term physical outcomes based on short-term dietary and sleeping telemetry.",
    problem: "Public health datasets are dense and difficult for everyday users to interpret without visual, interactive predictive pipelines.",
    solution: "A Scikit-Learn classification forest model trained on authentic biometric datasets, paired with a custom dark-themed Matplotlib visualizer.",
    metrics: [
      { label: "Model F1 Score", value: "91.2%" },
      { label: "Biometric Data Rows", value: "10k+" },
      { label: "Prediction Accuracy", value: "93%" }
    ],
    impactText: "Trained random forest and gradient boosted classifiers to output health risk indices, integrating robust feature scaling and cross-validation.",
    details: [
      "Trained model architecture over 10,000 clean records, incorporating sleep, hydration, and activity datasets.",
      "Crafted neon-tinted data charts using Matplotlib, mapping decision boundary lines in high contrast.",
      "Optimized model pipeline sizes to make them executable within small, edge-based client containers."
    ]
  },
  {
    id: "bluecollar",
    title: "BLUE COLLAR CONNECT",
    file: "bluecollar.db",
    type: "Social Platform & Full-Stack App",
    stack: ["React.js", "Node.js", "REST APIs", "Figma"],
    status: "COMPLETED",
    neonColor: "var(--neon-cyan)",
    emoji: "🔗",
    accentHex: "#0099FF",
    description: "A zero-fee direct job-matching community platform that connects local daily-wage workers directly with neighborhood opportunities.",
    problem: "Blue-collar workers are routinely exploited by predatory recruiting agencies charging up to 30% of their daily wages.",
    solution: "A mobile-first marketplace that coordinates direct chat links between hirers and workers with zero commissions, utilizing highly visual interfaces.",
    metrics: [
      { label: "predatory fees cut", value: "100%" },
      { label: "Job Placements Made", value: "850+" },
      { label: "User Onboarding Time", value: "45s" }
    ],
    impactText: "Designed and launched a social utility platform that eliminates recruiters, protecting worker wages with simple, language-agnostic mobile channels.",
    details: [
      "Designed full visual systems in Figma, optimizing font sizes and graphic symbols to cater to semi-literate demographics.",
      "Engineered an automated SMS/voice alert gateway that notifies workers of jobs close to their coordinates.",
      "Built clean, lightweight REST endpoints with Express to manage geographic searches under high concurrency."
    ]
  }
];
