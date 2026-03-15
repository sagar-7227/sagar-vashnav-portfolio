import { Suspense, lazy, useState } from "react";
import SectionReveal from "./components/SectionReveal";
import Terminal from "./components/Terminal";

const ServerCanvas = lazy(() => import("./components/ServerCanvas"));

interface NavLink {
  label: string;
  href: string;
  ocid: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", ocid: "nav.link.1" },
  { label: "Experience", href: "#about", ocid: "nav.link.2" },
  { label: "Projects", href: "#projects", ocid: "nav.link.3" },
  { label: "Stack", href: "#stack", ocid: "nav.link.4" },
  { label: "Achievements", href: "#achievements", ocid: "nav.link.5" },
  { label: "Contact", href: "#contact", ocid: "nav.link.6" },
];

const IMPACT_CARDS = [
  {
    id: "ic1",
    metric: "60%+",
    label: "Reduction in login effort",
    sub: "via Keycloak SSO integration",
  },
  {
    id: "ic2",
    metric: "10x",
    label: "Traffic Scaling achieved",
    sub: "via Kafka stream optimization",
  },
  {
    id: "ic3",
    metric: "1000+",
    label: "DSA Solutions",
    sub: "across LeetCode & GFG",
  },
  {
    id: "ic4",
    metric: "Patent",
    label: "Holder",
    sub: "Digital Identity & Financial Inclusion",
  },
];

const STARHEALTH_POINTS = [
  "Implemented Spring Boot authentication → drove 20% increase in user adoption",
  "Integrated SonarQube into CI pipeline → achieved 30% reduction in bugs across codebase",
  "Engineered RSA/AES encryption and Kafka-based async workflows for sensitive health data processing",
  "Deployed Keycloak SSO for 40+ internal applications → 60% reduction in login effort across the platform",
];

const LFX_POINTS = [
  "Contributed to the Linux kernel codebase under Linux Foundation mentorship",
  "One of the most selective open-source programs globally",
  "Worked on low-level systems programming in C",
];

const SKILL_GROUPS = [
  {
    id: "sg1",
    title: "Core Languages",
    accent: "cobalt",
    skills: ["Java", "Python", "Golang"],
  },
  {
    id: "sg2",
    title: "Databases",
    accent: "lime",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "sg3",
    title: "Backend Stack",
    accent: "cobalt",
    skills: [
      "Spring Boot",
      "Hibernate/JPA",
      "Spring Batch",
      "Kafka",
      "Spring MVC",
    ],
  },
  {
    id: "sg4",
    title: "Tools & Testing",
    accent: "lime",
    skills: [
      "Redis",
      "Swagger",
      "JUnit",
      "TestNG",
      "SonarQube",
      "Log4j",
      "SLF4J",
      "Git",
    ],
  },
  {
    id: "sg5",
    title: "Cloud & DevOps",
    accent: "cobalt",
    skills: ["Docker", "AWS", "GCP", "Kubernetes", "Jenkins"],
  },
  {
    id: "sg6",
    title: "Core Concepts",
    accent: "lime",
    skills: [
      "Data Structures & Algorithms",
      "System Design",
      "Design Patterns",
      "OOPs",
      "Microservices",
    ],
  },
];

const PROJECTS = [
  {
    id: "proj1",
    tag: "[ PRODUCTION ]",
    tagColor: "#AAFF00",
    tagBg: "rgba(170,255,0,0.1)",
    tagBorder: "rgba(170,255,0,0.3)",
    title: "File Processor Service",
    metric: "15,000 records/min",
    problem:
      "Processing 100k+ monthly documents at scale — bottlenecks in synchronous pipelines caused unacceptable latency and throughput limits.",
    solution:
      "Reactive, non-blocking architecture using Reactor WebClient for async HTTP flows, Kafka for event streaming, and Redis for intermediate state caching — achieving 45% latency reduction.",
    highlights: [
      "15,000 records/min throughput with 45% latency reduction",
      "Reactor WebClient for non-blocking I/O flows",
      "Kafka event streaming for resilient async processing",
      "Redis caching layer for intermediate state",
    ],
    stack: ["Spring Boot", "Reactor WebClient", "Kafka", "Redis", "MySQL"],
    githubUrl: "https://github.com/sagar-7227/file-processor-service",
    ocid: "projects.card.1",
    showDiagram: false,
  },
  {
    id: "proj2",
    tag: "[ ENTERPRISE ]",
    tagColor: "#2E5BFF",
    tagBg: "rgba(46,91,255,0.1)",
    tagBorder: "rgba(46,91,255,0.3)",
    title: "Single Sign-On Application",
    metric: "40+ Apps Unified",
    problem:
      "40+ internal applications required separate login flows, creating friction and security gaps across the enterprise platform.",
    solution:
      "Keycloak-based SSO platform with support for Azure AD, Okta, and Google identity providers. Jenkins CI/CD pipeline automated deployments — reducing deployment time by 70%.",
    highlights: [
      "Azure AD, Okta, and Google identity provider support",
      "Jenkins CI/CD pipeline → 70% reduction in deployment time",
      "60% reduction in login effort across 40+ applications",
      "Spring Security integration with role-based access",
    ],
    stack: ["Keycloak", "Spring Boot", "Jenkins", "Azure AD", "Okta", "Docker"],
    githubUrl: "https://github.com/sagar-7227/sso-application",
    ocid: "projects.card.2",
    showDiagram: false,
  },
  {
    id: "proj3",
    tag: "[ AI/ML ]",
    tagColor: "#A855F7",
    tagBg: "rgba(168,85,247,0.1)",
    tagBorder: "rgba(168,85,247,0.3)",
    title: "AI Code Review Tool",
    metric: "Automated Reviews",
    problem:
      "Automating manual code review cycles to improve developer productivity and reduce review turnaround time.",
    solution:
      "Microservices architecture with Spring Boot, integrated with OpenAI API for intelligent code analysis and suggestions.",
    highlights: [
      "Implemented JWT for secure auth",
      "Containerized using Docker & Kubernetes",
      "REST API with Spring Security",
    ],
    stack: ["Spring Boot", "OpenAI API", "JWT", "Docker", "MySQL"],
    githubUrl: "https://github.com/sagar-7227/ai-code-review-tool",
    ocid: "projects.card.3",
    showDiagram: false,
  },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-16 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 400px 80px at 50% 50%, rgba(46,91,255,0.15) 0%, transparent 70%)",
        }}
      />
      <h2
        className="font-display text-3xl md:text-4xl font-bold text-white relative"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <div
        className="mx-auto mt-3 rounded-full"
        style={{
          width: 48,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #2E5BFF, transparent)",
        }}
      />
    </div>
  );
}

function TechPill({
  label,
  variant = "cobalt",
}: { label: string; variant?: "cobalt" | "lime" }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-medium"
      style={{
        background:
          variant === "cobalt" ? "rgba(46,91,255,0.12)" : "rgba(170,255,0,0.1)",
        border: `1px solid ${
          variant === "cobalt" ? "rgba(46,91,255,0.4)" : "rgba(170,255,0,0.35)"
        }`,
        color: variant === "cobalt" ? "#7B9FFF" : "#AAFF00",
      }}
    >
      {label}
    </span>
  );
}

function CachingProxyDiagram() {
  return (
    <div
      className="rounded-lg p-4 my-4"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(46,91,255,0.2)",
      }}
    >
      <p
        className="text-xs font-mono-code mb-3"
        style={{ color: "rgba(240,240,255,0.4)" }}
      >
        {"//"} Architecture Diagram
      </p>
      <svg
        viewBox="0 0 420 80"
        width="100%"
        height="80"
        role="img"
        aria-label="Caching proxy architecture: Client to Proxy Cache with Redis to Origin Server"
      >
        {/* Client box */}
        <rect
          x="4"
          y="20"
          width="80"
          height="38"
          rx="6"
          fill="rgba(46,91,255,0.15)"
          stroke="rgba(46,91,255,0.6)"
          strokeWidth="1"
        />
        <text
          x="44"
          y="36"
          textAnchor="middle"
          fill="#7B9FFF"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="600"
        >
          Client
        </text>
        <text
          x="44"
          y="50"
          textAnchor="middle"
          fill="rgba(123,159,255,0.6)"
          fontSize="8"
          fontFamily="monospace"
        >
          Request
        </text>

        {/* Arrow Client → Proxy */}
        <line
          x1="84"
          y1="39"
          x2="116"
          y2="39"
          stroke="rgba(46,91,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="4,2"
        />
        <polygon points="116,35 124,39 116,43" fill="rgba(46,91,255,0.6)" />

        {/* Proxy Cache box */}
        <rect
          x="124"
          y="8"
          width="108"
          height="62"
          rx="6"
          fill="rgba(170,255,0,0.08)"
          stroke="rgba(170,255,0,0.5)"
          strokeWidth="1"
        />
        <text
          x="178"
          y="26"
          textAnchor="middle"
          fill="#AAFF00"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="600"
        >
          Proxy Cache
        </text>
        <rect
          x="138"
          y="32"
          width="80"
          height="28"
          rx="4"
          fill="rgba(170,255,0,0.1)"
          stroke="rgba(170,255,0,0.3)"
          strokeWidth="1"
        />
        <text
          x="178"
          y="44"
          textAnchor="middle"
          fill="#AAFF00"
          fontSize="9"
          fontFamily="monospace"
        >
          Redis
        </text>
        <text
          x="178"
          y="55"
          textAnchor="middle"
          fill="rgba(170,255,0,0.6)"
          fontSize="7.5"
          fontFamily="monospace"
        >
          TTL Cache
        </text>

        {/* Arrow Proxy → Origin */}
        <line
          x1="232"
          y1="39"
          x2="264"
          y2="39"
          stroke="rgba(46,91,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="4,2"
        />
        <polygon points="264,35 272,39 264,43" fill="rgba(46,91,255,0.6)" />

        {/* Origin Server box */}
        <rect
          x="272"
          y="20"
          width="100"
          height="38"
          rx="6"
          fill="rgba(46,91,255,0.1)"
          stroke="rgba(46,91,255,0.4)"
          strokeWidth="1"
        />
        <text
          x="322"
          y="36"
          textAnchor="middle"
          fill="#7B9FFF"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="600"
        >
          Origin
        </text>
        <text
          x="322"
          y="50"
          textAnchor="middle"
          fill="rgba(123,159,255,0.6)"
          fontSize="8"
          fontFamily="monospace"
        >
          Server
        </text>

        {/* Cache miss label */}
        <text
          x="250"
          y="32"
          textAnchor="middle"
          fill="rgba(240,240,255,0.3)"
          fontSize="7"
          fontFamily="monospace"
        >
          cache miss
        </text>
      </svg>
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(46,91,255,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-xl font-bold"
          style={{ color: "#2E5BFF", letterSpacing: "-0.02em" }}
        >
          SV<span style={{ color: "#AAFF00" }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              className="text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(240,240,255,0.65)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/sagar-7227"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.link.6"
            title="GitHub"
            className="transition-colors duration-200 hover:opacity-80"
            style={{ color: "rgba(240,240,255,0.65)" }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-label="GitHub"
            >
              <title>GitHub</title>
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="#contact"
            data-ocid="nav.primary_button"
            className="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
            style={{
              background: "#2E5BFF",
              color: "#fff",
              boxShadow: "0 0 20px rgba(46,91,255,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(46,91,255,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 20px rgba(46,91,255,0.3)";
            }}
          >
            Direct Line
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          style={{ color: "#2E5BFF" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 mb-1.5" style={{ background: "#2E5BFF" }} />
          <div className="w-6 h-0.5 mb-1.5" style={{ background: "#2E5BFF" }} />
          <div className="w-4 h-0.5" style={{ background: "#2E5BFF" }} />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(46,91,255,0.15)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              className="text-sm font-medium py-2"
              style={{ color: "rgba(240,240,255,0.75)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="min-h-screen flex items-center pt-20"
      style={{
        background:
          "linear-gradient(135deg, #0A0A0F 0%, #0D0D1A 50%, #080812 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,91,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(46,91,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "30%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(46,91,255,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-6">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span
                className="font-mono-code text-xs px-3 py-1 rounded"
                style={{
                  color: "#2E5BFF",
                  background: "rgba(46,91,255,0.1)",
                  border: "1px solid rgba(46,91,255,0.3)",
                }}
              >
                Sagar Vashnav | Software Development Engineer
              </span>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h1
                className="font-display font-bold text-white"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 4rem)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.03em",
                }}
              >
                Sagar Vashnav
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #2E5BFF, #6B8FFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Software Development Engineer
                </span>
              </h1>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-lg"
                style={{ color: "rgba(240,240,255,0.6)" }}
              >
                Specializing in Java Backend, Microservices, and Event-Driven
                Architectures. Currently enhancing platform security and
                scalability at Starhealth Insurance.
              </p>
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-lg mt-4"
                style={{
                  background: "rgba(170,255,0,0.06)",
                  border: "1px solid rgba(170,255,0,0.25)",
                }}
              >
                <span
                  style={{
                    color: "#AAFF00",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  ⚡
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(240,240,255,0.75)" }}
                >
                  Built systems supporting{" "}
                  <span style={{ color: "#AAFF00", fontWeight: 700 }}>
                    40+ internal applications
                  </span>{" "}
                  and processing{" "}
                  <span style={{ color: "#AAFF00", fontWeight: 700 }}>
                    100k+ documents monthly
                  </span>
                </p>
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Terminal />
            </div>

            <div
              className="animate-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#projects"
                data-ocid="hero.primary_button"
                className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200"
                style={{
                  background: "#2E5BFF",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(46,91,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 50px rgba(46,91,255,0.7)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(46,91,255,0.4)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                View My Work
              </a>
              <a
                href="/assets/uploads/Sagar_Vashnav_Java_Backend_2Years-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
                className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  color: "#2E5BFF",
                  border: "1px solid rgba(46,91,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(46,91,255,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#2E5BFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(46,91,255,0.5)";
                }}
              >
                Download Resume
              </a>
            </div>
          </div>

          <div
            className="animate-fade-up hidden lg:flex items-center justify-center"
            style={{ animationDelay: "0.3s", height: 480 }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(46,91,255,0.15)",
                boxShadow: "0 0 60px rgba(46,91,255,0.1)",
              }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                      style={{
                        borderColor: "rgba(46,91,255,0.4)",
                        borderTopColor: "transparent",
                      }}
                    />
                  </div>
                }
              >
                <ServerCanvas />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-24"
      style={{ background: "#0A0A0F", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Impact Dashboard" />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {IMPACT_CARDS.map((card, i) => (
            <SectionReveal key={card.id} delay={i * 100}>
              <div
                data-ocid={`impact.card.${i + 1}`}
                className="rounded-xl p-8 glass-card cursor-default transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(170,255,0,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(170,255,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(46,91,255,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="font-display font-bold mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "#AAFF00",
                    lineHeight: "1",
                    textShadow: "0 0 20px rgba(170,255,0,0.4)",
                  }}
                >
                  {card.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {card.label}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "rgba(240,240,255,0.5)" }}
                >
                  {card.sub}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "#0D0D14", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Core Experience" />
        </SectionReveal>

        <SectionReveal>
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p
              style={{
                color: "rgba(240,240,255,0.75)",
                lineHeight: "1.8",
                fontSize: "1.05rem",
              }}
            >
              Professional Java Developer with 2+ years of experience in
              enterprise application development. Experienced in implementing
              event-driven architectures using Kafka to handle real-time data
              streams, designing Spring Boot microservices for scalable
              distributed systems, and securing applications with Keycloak SSO
              and Spring Security.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionReveal delay={100}>
            <div
              data-ocid="experience.card.1"
              className="glass-card rounded-xl p-8 h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Starhealth Insurance
                  </h3>
                  <p
                    className="text-sm mt-1 font-mono-code"
                    style={{ color: "#2E5BFF" }}
                  >
                    Software Development Engineer
                  </p>
                </div>
                <span
                  className="text-xs font-mono-code px-2 py-1 rounded"
                  style={{
                    color: "rgba(240,240,255,0.4)",
                    border: "1px solid rgba(240,240,255,0.1)",
                  }}
                >
                  2023 &ndash; Present
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {STARHEALTH_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm"
                    style={{ color: "rgba(240,240,255,0.65)" }}
                  >
                    <span
                      style={{ color: "#2E5BFF", flexShrink: 0, marginTop: 2 }}
                    >
                      ▸
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Java", "Spring Boot", "Keycloak", "MySQL", "Redis"].map(
                  (t) => (
                    <TechPill key={t} label={t} variant="cobalt" />
                  ),
                )}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div
              data-ocid="experience.card.2"
              className="rounded-xl p-8 h-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow:
                  "0 0 0 1px rgba(170,255,0,0.25), 0 0 40px rgba(170,255,0,0.08), inset 0 0 40px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="inline-block font-mono-code text-xs font-bold px-3 py-1 rounded mb-4"
                style={{
                  background: "rgba(170,255,0,0.12)",
                  color: "#AAFF00",
                  border: "1px solid rgba(170,255,0,0.4)",
                  textShadow: "0 0 10px rgba(170,255,0,0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                🏆 ELITE ACHIEVEMENT
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Linux Kernel Mentorship
                  </h3>
                  <p
                    className="text-sm mt-1 font-mono-code"
                    style={{
                      background: "linear-gradient(90deg, #AAFF00, #2E5BFF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Open Source Contributor — Linux Kernel
                  </p>
                </div>
                <span
                  className="text-xs font-mono-code px-2 py-1 rounded"
                  style={{
                    color: "rgba(170,255,0,0.6)",
                    border: "1px solid rgba(170,255,0,0.2)",
                  }}
                >
                  LFX Fall &apos;23
                </span>
              </div>

              <p
                className="text-xs mb-4 font-mono-code"
                style={{ color: "rgba(170,255,0,0.5)" }}
              >
                LFX Mentorship Program &middot; Linux Foundation
              </p>

              <ul className="space-y-2 mb-6">
                {LFX_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm"
                    style={{ color: "rgba(240,240,255,0.65)" }}
                  >
                    <span
                      style={{ color: "#AAFF00", flexShrink: 0, marginTop: 2 }}
                    >
                      ▸
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {["C", "Linux Kernel", "Git", "Systems Programming"].map(
                  (t) => (
                    <TechPill key={t} label={t} variant="lime" />
                  ),
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24"
      style={{ background: "#0A0A0F", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Projects" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <SectionReveal key={p.id} delay={i * 150}>
              <div
                data-ocid={p.ocid}
                className="glass-card rounded-xl p-8 transition-all duration-300 flex flex-col h-full"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(46,91,255,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px rgba(46,91,255,0.15)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(46,91,255,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono-code text-xs font-bold px-2 py-1 rounded"
                    style={{
                      color: p.tagColor,
                      background: p.tagBg,
                      border: `1px solid ${p.tagBorder}`,
                    }}
                  >
                    {p.tag}
                  </span>
                  <span
                    className="font-mono-code text-xs px-2 py-1 rounded"
                    style={{
                      color: "rgba(240,240,255,0.4)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {p.metric}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-4">
                  {p.title}
                </h3>

                {/* Problem */}
                <div className="mb-3">
                  <span
                    className="text-xs font-mono-code font-bold uppercase tracking-wider"
                    style={{ color: p.tagColor }}
                  >
                    The Problem
                  </span>
                  <p
                    className="text-sm leading-relaxed mt-1 italic"
                    style={{ color: "rgba(240,240,255,0.55)" }}
                  >
                    {p.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-3">
                  <span
                    className="text-xs font-mono-code font-bold uppercase tracking-wider"
                    style={{ color: "rgba(240,240,255,0.5)" }}
                  >
                    Solution / Architecture
                  </span>
                  <p
                    className="text-sm leading-relaxed mt-1"
                    style={{ color: "rgba(240,240,255,0.65)" }}
                  >
                    {p.solution}
                  </p>
                </div>

                {/* Architecture Diagram for Caching Proxy */}
                {p.showDiagram && <CachingProxyDiagram />}

                {/* Key Highlights */}
                <div className="mb-5">
                  <span
                    className="text-xs font-mono-code font-bold uppercase tracking-wider"
                    style={{ color: "rgba(240,240,255,0.5)" }}
                  >
                    Key Highlights
                  </span>
                  <ul className="mt-2 space-y-1">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-xs"
                        style={{ color: "rgba(240,240,255,0.6)" }}
                      >
                        <span style={{ color: p.tagColor, flexShrink: 0 }}>
                          ▸
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.map((t) => (
                    <TechPill key={t} label={t} variant="cobalt" />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`projects.link.${i + 1}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200"
                    style={{
                      background: "transparent",
                      color: "rgba(240,240,255,0.7)",
                      border: "1px solid rgba(240,240,255,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(240,240,255,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(240,240,255,0.15)";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(240,240,255,0.7)";
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section
      id="stack"
      className="py-24"
      style={{ background: "#0D0D14", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Technical Arsenal" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <SectionReveal key={group.id} delay={(i + 1) * 100}>
              <div
                data-ocid={`stack.panel.${i + 1}`}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-1.5 h-7 rounded-full"
                    style={{
                      background:
                        group.accent === "cobalt"
                          ? "linear-gradient(180deg, #2E5BFF, #6B8FFF)"
                          : "linear-gradient(180deg, #AAFF00, #55CC00)",
                    }}
                  />
                  <h3 className="font-display text-base font-bold text-white">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechPill
                      key={skill}
                      label={skill}
                      variant={group.accent as "cobalt" | "lime"}
                    />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const KEY_ACHIEVEMENTS = [
  {
    id: "ach1",
    icon: "🏛️",
    label: "Patent Holder",
    title: "Decentralized System for Digital Identity and Financial Inclusion",
    accent: "#AAFF00",
    accentBg: "rgba(170,255,0,0.08)",
    accentBorder: "rgba(170,255,0,0.25)",
  },
  {
    id: "ach2",
    icon: "🐧",
    label: "Open Source Contributor",
    title: "Linux Kernel Mentee under CNCF Projects (LFX Fall '23)",
    accent: "#2E5BFF",
    accentBg: "rgba(46,91,255,0.08)",
    accentBorder: "rgba(46,91,255,0.25)",
  },
  {
    id: "ach3",
    icon: "⚡",
    label: "Problem Solver",
    title: "1000+ DSA Questions Solved across LeetCode, CodeChef, and GFG",
    accent: "#A855F7",
    accentBg: "rgba(168,85,247,0.08)",
    accentBorder: "rgba(168,85,247,0.25)",
  },
  {
    id: "ach4",
    icon: "🏆",
    label: "Scholarship Recipient",
    title: "Dan Kohn Scholarship recipient for KubeCon North America",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.25)",
  },
];

function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-24"
      style={{ background: "#0A0A0F", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Key Achievements" />
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEY_ACHIEVEMENTS.map((ach, i) => (
            <SectionReveal key={ach.id} delay={i * 120}>
              <div
                data-ocid={`achievements.card.${i + 1}`}
                className="rounded-xl p-6 flex gap-5 items-start transition-all duration-300"
                style={{
                  background: ach.accentBg,
                  border: `1px solid ${ach.accentBorder}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 32px ${ach.accentBg}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: ach.accentBg,
                    border: `1px solid ${ach.accentBorder}`,
                  }}
                >
                  {ach.icon}
                </div>
                <div>
                  <span
                    className="text-xs font-mono-code font-bold uppercase tracking-widest"
                    style={{ color: ach.accent }}
                  >
                    {ach.label}
                  </span>
                  <p
                    className="mt-1 text-sm font-medium leading-relaxed"
                    style={{ color: "rgba(240,240,255,0.85)" }}
                  >
                    {ach.title}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Sagar,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.open(
      `mailto:work.sagarvashnav@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(46,91,255,0.25)",
    borderRadius: "8px",
    color: "#F0F0FF",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "14px",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "#0A0A0F", scrollMarginTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeader title="Direct Line" />
          <p
            className="text-center text-lg -mt-8 mb-16"
            style={{ color: "rgba(240,240,255,0.5)" }}
          >
            Let&apos;s architect something great together.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SectionReveal delay={100}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm mb-2"
                  style={{ color: "rgba(240,240,255,0.6)" }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  data-ocid="contact.input.1"
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.6)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.25)";
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm mb-2"
                  style={{ color: "rgba(240,240,255,0.6)" }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  data-ocid="contact.input.2"
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.6)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.25)";
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm mb-2"
                  style={{ color: "rgba(240,240,255,0.6)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  data-ocid="contact.textarea"
                  placeholder="Tell me about your project..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.6)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(46,91,255,0.25)";
                  }}
                />
              </div>
              <button
                type="submit"
                data-ocid="contact.submit_button"
                className="w-full py-3 rounded-md font-semibold text-sm transition-all duration-200"
                style={{
                  background: "#2E5BFF",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(46,91,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 50px rgba(46,91,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(46,91,255,0.3)";
                }}
              >
                Send Message
              </button>
            </form>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="space-y-8">
              <div className="glass-card rounded-xl p-6">
                <div
                  className="text-xs font-mono-code mb-2"
                  style={{ color: "rgba(240,240,255,0.4)" }}
                >
                  PRIMARY CONTACT
                </div>
                <a
                  href="mailto:work.sagarvashnav@gmail.com"
                  data-ocid="contact.link.1"
                  className="font-mono-code text-lg font-bold transition-colors duration-200 break-all"
                  style={{ color: "#2E5BFF" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#6B8FFF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#2E5BFF";
                  }}
                >
                  work.sagarvashnav@gmail.com
                </a>
              </div>

              <a
                href="https://www.linkedin.com/in/sagarvashnav/"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.link.2"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold transition-all duration-200"
                style={{
                  background: "#2E5BFF",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(46,91,255,0.3)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 50px rgba(46,91,255,0.6)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(46,91,255,0.3)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>

              <p
                className="text-sm text-center"
                style={{ color: "rgba(240,240,255,0.4)" }}
              >
                Open to backend engineering roles and system design
                collaborations.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-8 text-center text-sm"
      style={{
        background: "#0D0D14",
        borderTop: "1px solid rgba(46,91,255,0.1)",
        color: "rgba(240,240,255,0.4)",
      }}
    >
      <p>
        &copy; {year}{" "}
        <span style={{ color: "#2E5BFF", fontWeight: 600 }}>Sagar Vashnav</span>
        . Built with precision.
      </p>
      <div className="flex justify-center gap-4 mt-3">
        <a
          href="https://www.linkedin.com/in/sagarvashnav/"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="footer.link.1"
          title="LinkedIn"
          className="inline-flex items-center gap-1.5 text-xs transition-opacity duration-200 hover:opacity-80"
          style={{ color: "rgba(46,91,255,0.8)" }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="https://github.com/sagar-7227"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="footer.link.2"
          title="GitHub"
          className="inline-flex items-center gap-1.5 text-xs transition-opacity duration-200 hover:opacity-80"
          style={{ color: "rgba(240,240,255,0.5)" }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
      <p className="mt-3 text-xs" style={{ color: "rgba(240,240,255,0.25)" }}>
        Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "rgba(46,91,255,0.6)" }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F" }}>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
