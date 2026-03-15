import { Project, Testimonial } from "@/types";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "privacy-chat",
    title: "Privacy Chat App",
    description:
      "Secure cross-platform chat (Android & iOS) with end-to-end encryption, real-time 1-to-1 messaging via WebSocket and FCM push-notification fallback.",
    tech: ["Flutter", "TypeScript", "WebSocket", "Background Services", "WebRTC", "MySQL"],
    github: "https://github.com/fatwaanugerah21/privacy-chat-app",
    featured: true,
  },
  {
    id: "trading-bots",
    title: "Automated Trading Bot Platform",
    description:
      "Fleet of 15+ automated trading bots performing real-time market data ingestion and automated order execution across multiple exchanges, processing $2M+ in monthly trading volume.",
    tech: ["TypeScript", "Go", "WebSocket", "Node.js", "PostgreSQL", "Docker", "Azure"],
    featured: true,
  },
  {
    id: "backtesting-platform",
    title: "Backtesting Platform",
    description:
      "High-performance backtesting engine leveraging Node.js worker_threads to parallelize strategy simulation across all available CPU cores, processing multi-year OHLCV candle data. Real-time WebSocket dashboard surfacing Sharpe ratio, max drawdown, and win rate.",
    tech: ["Node.js", "worker_threads", "WebSocket", "React.js", "TypeScript"],
    featured: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Bobby Hulstroem",
    role: "CTO",
    company: "Avasosoft Technology",
    content:
      "Fatwa consistently delivered high-quality, scalable solutions. His ownership mindset and ability to architect complex real-time systems made him an invaluable part of our team.",
  },
  {
    id: "2",
    name: "Thuan Nguyen",
    role: "Engineering Lead",
    company: "SDConnect.VN",
    content:
      "Working with Fatwa was a pleasure — he significantly improved our platform performance and brought a level of professionalism and technical depth that elevated the entire team.",
  },
];

export const SKILLS_BY_CATEGORY = [
  {
    category: "Languages",
    items: ["TypeScript", "Java", "Python", "Go", "Dart"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Flutter", "TailwindCSS", "Sass", "Styled Components"],
  },
  {
    category: "Backend",
    items: ["Fastify", "Express.js", "Gin", "Flask", "REST API", "GraphQL"],
  },
  {
    category: "Real-Time",
    items: ["WebSocket", "WebRTC", "Event-Driven", "Background Services"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "DynamoDB"],
  },
];

export const EXPERIENCE = [
  {
    company: "AVASO Technology Solutions",
    role: "Senior Software Engineer",
    period: "Sep 2022 – Feb 2026",
    location: "Remote",
    highlights: [
      "Architected systems serving 100k+ users across multiple client platforms",
      "Built and maintained 15+ automated trading bots with hundreds of thousands in monthly volume",
      "Engineered WebSocket real-time infrastructure with sub-100ms latency",
      "Mentored 3 engineers, driving architecture and code quality",
    ],
  },
  {
    company: "SDConnect.VN",
    role: "Full Stack Developer",
    period: "Jan 2022 – Sep 2022",
    location: "Remote",
    highlights: [
      "Reduced frontend load time by 60% via code splitting and lazy loading",
      "Cut database response time by 55% with Redis caching strategies",
      "Decreased feature delivery time by 35% through reusable component libraries",
      "Replaced REST polling with WebSocket, enabling sub-100ms data exchange",
    ],
  },
  {
    company: "Emolyze.Tech",
    role: "Junior Full Stack Engineer",
    period: "Feb 2021 – Jan 2022",
    location: "Remote",
    highlights: [
      "Built internal analytics dashboard from scratch for real-time KPI visibility",
      "Engineered REST API integration layer unifying third-party data sources",
      "Established foundational CI/CD practices on AWS with Docker",
    ],
  },
];

export const STATS = [
  { label: "Years Experience", value: "5+" },
  { label: "Users Served", value: "1M+" },
  { label: "Trading Bots Built", value: "15+" },
  { label: "Engineers Mentored", value: "3" },
];
