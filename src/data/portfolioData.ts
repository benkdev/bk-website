export interface ProjectOrEngagement {
  title: string;
  category: string;
  description: string;
  achievements: string[];
  methodologies: string[];
  technologies: string[];
  jobAlignmentNote?: string;
}

export interface CompanyExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  headline: string;
  summary: string;
  logoType: 'addepar' | 'linkedin' | 'google' | 'slalom';
  metrics: { label: string; value: string }[];
  keyContributions: string[];
  engagements: ProjectOrEngagement[];
  coreTech: string[];
  jobPostingsMatch: {
    title: string;
    description: string;
  }[];
}

export const METRIC_HIGHLIGHTS = [
  {
    number: "13+",
    label: "Years of Experience",
    subtext: "SDET & Test Architect",
  },
  {
    number: "$30B",
    label: "Regulatory Risk Mitigated",
    subtext: "Delivered company-wide compliance test infra at Google",
  },
  {
    number: "73%",
    label: "Defect Leakage Reduction",
    subtext: "Shift-left agentic test framework at Addepar (11d → 3d)",
  },
  {
    number: "32+",
    label: "Production Products Tested",
    subtext: "Adopted scalable UI/API test platforms across Google",
  },
  {
    number: "$1B/yr",
    label: "Revenue System Scaled",
    subtext: "End-to-end CRM performance & resiliency at LinkedIn",
  },
  {
    number: "+27%",
    label: "Team Velocity Lift",
    subtext: "Accelerated sprint cycles through AI test generation",
  },
];

export const CORE_TEST_PILLARS = [
  {
    title: "Platform & Test Harness Architecture",
    description: "Designing zero-maintenance, self-healing test frameworks and shared engineering libraries that developers adopt, trust, and extend.",
    skills: ["Playwright", "Selenium WebDriver", "WebDriverIO", "Checkly", "REST Assured", "gRPC", "Self-Healing Test Engines"],
    icon: "Layers",
  },
  {
    title: "Distributed Systems & Cloud Scale",
    description: "Both building and breaking cloud-native microservices, testing under extreme load, contract validation, and resiliency engineering.",
    skills: ["JMeter", "Distributed Testing", "AWS Cloud", "Docker & Kubernetes", "Asynchronous Event Flows", "Fault Injection"],
    icon: "Server",
  },
  {
    title: "Systems & Edge/Sensor Integration",
    description: "Validating complex interactions across cloud services and device/sensor endpoints. Championing Design for Testability (DFT) and gate reviews.",
    skills: ["Cloud-to-Device Integration", "Hardware/Software Validation", "DFT Gate Reviews", "Yield & Flakiness Debugging"],
    icon: "Cpu",
  },
  {
    title: "AI-Augmented & Shift-Left Quality",
    description: "Embedding AI agents and test generation into developer workflows to catch defects in minutes rather than weeks.",
    skills: ["Agentic E2E Test Execution", "AI Test Code Generation", "CI/CD Check-in Gates", "RCA & Observability", "Mentorship"],
    icon: "Sparkles",
  },
];

export const COMPANIES_DATA: CompanyExperience[] = [
  {
    id: "addepar",
    company: "Addepar",
    role: "Senior Automation Engineer (Test Infrastructure)",
    period: "Jun 2025 – Present",
    type: "Full-time",
    location: "Remote",
    headline: "Architected agentic AI E2E testing framework and an AI synthetic test data generation framework with self-healing replay.",
    summary: "Spearheaded test infrastructure transformation at Addepar, architecting a revolutionary no-code, AI-driven E2E testing framework and an AI synthetic test data generation framework that autonomously models complex financial scenarios and translates acceptance criteria into resilient UI/API test runs.",
    logoType: "addepar",
    metrics: [
      { label: "Defect Leakage Reduction", value: "73%" },
      { label: "Cycle Time Drop", value: "11d → 3d" },
      { label: "Maintenance Overhead", value: "~Zero" },
    ],
    keyContributions: [
      "Architected and built an agentic E2E UI testing framework that autonomously parses and executes user acceptance criteria, achieving no-code, near zero-maintenance test automation.",
      "Built an AI synthetic test data generation framework that dynamically synthesizes realistic, compliant test datasets and complex financial edge-case states.",
      "Engineered automated self-healing replay mechanisms that dynamically recover from DOM and data mutations.",
      "Championed cross-functional shift-left testing strategies embedded into developer CI/CD workflows, slashing average defect leakage from 11 days to 3 days (73% reduction).",
      "Created seamless integration hooks with AWS, GitHub Actions, and Jira for automated failure triage and traceability.",
    ],
    engagements: [
      {
        title: "Agentic AI Test Infrastructure & Shift-Left Platform",
        category: "Test Platform & AI Orchestration",
        description: "Built the company's next-generation testing platform using autonomous agentic validation, allowing product and engineering teams to verify complex financial workflows without writing brittle UI scripts.",
        achievements: [
          "Eliminated script flakiness via self-healing selectors and replay engines.",
          "Embedded verification gates into developer PR cycles, achieving instant shift-left feedback.",
          "Slashing defect leakage by 73% across engineering teams.",
        ],
        methodologies: [
          "Agentic AI Test Orchestration",
          "Shift-Left Quality Engineering",
          "Self-Healing Selectors",
          "Continuous Delivery Integration",
        ],
        technologies: [
          "Python",
          "TypeScript",
          "Playwright",
          "AWS Cloud Infrastructure",
          "GitHub Actions",
          "Jira REST API",
          "Docker",
        ],
        jobAlignmentNote: "Directly fulfills job requirements for utilizing AI technologies to streamline testing, building cloud SaaS testing tooling, and driving shift-left quality across engineering.",
      },
      {
        title: "AI Synthetic Test Data Generation Framework",
        category: "AI Data Engineering & Test Infrastructure",
        description: "Architected and built an AI synthetic test data generation framework that autonomously models complex financial domain entities, accounts, and market transactions to provision on-demand test environments.",
        achievements: [
          "Eliminated test data bottlenecks and manual dataset curation for engineering and QA teams.",
          "Synthesized compliant, high-fidelity portfolios and edge-case account states for end-to-end verification.",
          "Automated on-demand generation of repeatable, stateful financial entities for comprehensive regression testing.",
        ],
        methodologies: [
          "AI Synthetic Data Generation",
          "Automated Test-Data Management (TDM)",
          "Complex Domain Modeling",
          "On-Demand Test State Provisioning",
        ],
        technologies: [
          "Python",
          "AI Test Agents",
          "Docker",
          "REST APIs",
        ],
        jobAlignmentNote: "Directly addresses the requirement for utilizing AI technologies to streamline workflows and improve efficiency in test automation.",
      },
    ],
    coreTech: ["Python", "TypeScript", "Playwright", "AWS", "AI Synthetic Test Data", "GitHub Actions", "Docker"],
    jobPostingsMatch: [
      {
        title: "AI Synthetic Test Data & Agentic Automation",
        description: "Built an AI synthetic test data generation framework and agentic runner that autonomously creates test datasets and executes acceptance criteria.",
      },
      {
        title: "Shift-Left & Root Cause Reduction",
        description: "Reduced defect leakage by 73% by moving validation directly into early developer workflows.",
      },
    ],
  },
  {
    id: "linkedin",
    company: "LinkedIn",
    role: "Senior Software Test Engineer (via Flexton)",
    period: "Jun 2024 – Jun 2025",
    type: "Contract",
    location: "Remote / Distributed (US & India)",
    headline: "Owned test architecture for $1B/year revenue public CRM web application with global distributed teams.",
    summary: "Led testing strategy and test platform design for a mission-critical $1B/year enterprise CRM application. Built modern Playwright and WebDriverIO UI frameworks, synthetic monitoring via Checkly, and a high-load JMeter performance testing harness to ensure system resiliency.",
    logoType: "linkedin",
    metrics: [
      { label: "Automated Coverage", value: "+25%" },
      { label: "Team Velocity Lift", value: "+27%" },
      { label: "System Revenue Protected", value: "$1B/yr" },
    ],
    keyContributions: [
      "Owned end-to-end test architecture supporting globally distributed engineering teams (US and India) with comprehensive test coverage.",
      "Designed and delivered scalable UI automation frameworks (Playwright, WebDriverIO, Checkly, TypeScript, JavaScript) integrated into CI/CD pipelines.",
      "Built a high-concurrency performance and load-testing harness using Apache JMeter to validate scalability and identify performance bottlenecks under peak traffic.",
      "Pioneered AI-assisted code generation for automated test creation, boosting team velocity by 27%.",
      "Conducted thorough code reviews and architectural hygiene reviews, elevating SDET contribution standards and code quality.",
    ],
    engagements: [
      {
        title: "Enterprise CRM Platform Quality & Performance Harness",
        category: "Cloud SaaS & Resiliency Engineering",
        description: "Owned end-to-end quality and non-functional validation for LinkedIn's $1B/year public-facing enterprise CRM platform during a major architectural migration.",
        achievements: [
          "Constructed JMeter load-testing scenarios simulating tens of thousands of concurrent enterprise transactions to uncover latency spikes.",
          "Integrated synthetic monitoring with Checkly for continuous post-deployment health verification.",
          "Guided and mentored SDETs across North America and India on framework contribution patterns and testing standards.",
        ],
        methodologies: [
          "High-Concurrency Performance Testing",
          "End-to-End UI & API Automation",
          "Synthetic Health Monitoring",
          "AI-Assisted Test Generation",
          "Cross-Functional Team Leadership",
        ],
        technologies: [
          "Playwright",
          "WebDriverIO",
          "Apache JMeter",
          "Checkly",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "CI/CD Pipelines",
        ],
        jobAlignmentNote: "Directly mirrors the job spec's call for 'Both build stuff and break stuff!', spotting scalability limits and performance bottlenecks, and validating high-scale cloud SaaS products.",
      },
    ],
    coreTech: ["Playwright", "WebDriverIO", "Checkly", "Apache JMeter", "TypeScript", "JavaScript", "CI/CD"],
    jobPostingsMatch: [
      {
        title: "Cloud SaaS & Performance Under Extreme Load",
        description: "Designed stress testing and load harnesses validating 99.99% availability for a $1B/year revenue application under peak traffic surges.",
      },
      {
        title: "Distributed Global Team Leadership",
        description: "Guided engineering cohorts across multiple time zones (US and India), establishing unified test hygiene and code quality standards.",
      },
    ],
  },
  {
    id: "google",
    company: "Google",
    role: "Software Test Engineer",
    period: "May 2019 – Mar 2024",
    type: "Full-time (4 yrs 11 mos)",
    location: "Mountain View / Seattle, WA",
    headline: "Led international SDET teams, built UI/API test platforms adopted across 32 products, mitigating $30B in regulatory penalty risk.",
    summary: "Served as Software Test Engineer within Google's Engineering Productivity organization. Led cross-functional testing efforts for critical enterprise platforms, built scalable test frameworks across Java, TypeScript, and Dart, and partnered with leadership to enforce rigorous quality gates for high-stakes regulatory compliance.",
    logoType: "google",
    metrics: [
      { label: "Regulatory Risk Mitigated", value: "$30B" },
      { label: "Products Adopted", value: "32" },
      { label: "Coverage Increase", value: "+50%" },
      { label: "Onboarding Time Drop", value: "-67%" },
      { label: "Flakiness Reduction", value: "-5%" },
    ],
    keyContributions: [
      "Led global SDET teams (US, India) developing test automation strategies for high-stakes company-wide objectives, mitigating up to $30 billion in regulatory penalty risk.",
      "Designed and implemented robust front-end and service-oriented test automation frameworks (Selenium WebDriver, gRPC, Axe, Java, TypeScript, Dart) adopted across 28–32 public products.",
      "Integrated automated test suites into CI/CD pipelines, establishing stringent check-in gates that prevented production incidents.",
      "Spearheaded an internal initiative utilizing AI to auto-generate test infrastructure and eliminate setup boilerplate.",
      "Conducted proactive code and design document reviews to advocate for testability (DFT) and engineering hygiene.",
      "Mentored 6 junior and mid-level engineers, reducing developer onboarding time by 67%.",
    ],
    engagements: [
      {
        title: "Global Regulatory Compliance & Audit Test System",
        category: "High-Consequence Systems Validation",
        description: "Led a team of 6 SDETs to thoroughly test a critical application engineered for traceable compliance with strict international regulations under inflexible company deadlines.",
        achievements: [
          "Delivered multi-layer validation covering UI, performance, accessibility, and monitoring.",
          "Prevented up to $30B in regulatory exposure through automated audit trail verification.",
          "Implemented comprehensive gate reviews and sign-off criteria with executive stakeholders.",
        ],
        methodologies: [
          "Risk-Based Test Strategy",
          "Automated Gate Reviews",
          "Accessibility Testing (WCAG / Axe)",
          "Performance & Scalability Testing",
          "Cross-Functional Gate Approvals",
        ],
        technologies: [
          "Selenium WebDriver",
          "Java",
          "Python",
          "Dart",
          "Axe Accessibility Engine",
          "Google Internal CI/CD",
        ],
        jobAlignmentNote: "Matches the Amazon Leo requirements for 'support and organize release through gate reviews', 'requirements management', and 'identifying cross-functional tradeoffs between performance, schedule, risk, and scale'.",
      },
      {
        title: "Company-Wide Legal & Enterprise Services Automation",
        category: "Enterprise Infrastructure & gRPC API Testing",
        description: "Embedded across developer teams to build scalable UI and API test automation infrastructure for legal and enterprise support applications with real-time Google Chat and service-oriented integrations.",
        achievements: [
          "Architected gRPC and REST service contract test harnesses.",
          "Automated accessibility, internationalization (i18n), and localization (l10n) verification.",
          "Reduced test suite flakiness by 5% through deterministic synchronization and isolation.",
        ],
        methodologies: [
          "Service-Oriented Architecture (SOA) Testing",
          "gRPC Contract Validation",
          "Deterministic Test Reliability",
          "Localization & i18n Verification",
        ],
        technologies: [
          "gRPC",
          "Java",
          "TypeScript",
          "Selenium WebDriver",
          "Google Chat API Integrations",
        ],
        jobAlignmentNote: "Directly aligns with 'contract testing, integration testing spanning component and application levels, and service operations observability'.",
      },
    ],
    coreTech: ["Selenium WebDriver", "gRPC", "Java", "TypeScript", "Python", "Dart", "Axe", "CI/CD Gates"],
    jobPostingsMatch: [
      {
        title: "High-Stakes Gate Reviews & Risk Mitigation",
        description: "Mitigated $30B in regulatory penalty risks through rigorous test campaigns, cross-functional gate approvals, and traceable audit logs.",
      },
      {
        title: "Enterprise Framework Adoption (32 Products)",
        description: "Built shared test libraries and CI/CD gates adopted at massive organizational scale across dozens of production engineering teams.",
      },
      {
        title: "Testability (DFT) & Code Hygiene SME",
        description: "Served as subject-matter expert on design docs and code reviews to enforce architecture testability and clean interfaces.",
      },
    ],
  },
  {
    id: "slalom",
    company: "Slalom Consulting",
    role: "Senior Quality Engineer & Quality Engineer",
    period: "Feb 2013 – May 2019",
    type: "Full-time (6 yrs 4 mos)",
    location: "Seattle, WA",
    headline: "Engineered BDD/TDD test frameworks, hardware/terminal build verifications, and CI/CD pipelines across diverse client domains.",
    summary: "Delivered consultative quality engineering across major enterprise clients. Architected BDD/TDD automated test suites in Python and Java, built validation harnesses for physical restaurant kitchen display hardware terminals, and automated Salesforce CRM donor systems.",
    logoType: "slalom",
    metrics: [
      { label: "Acceptance Criteria Coverage", value: "75%" },
      { label: "Feedback Loop Velocity", value: "Instant" },
      { label: "Client Domains Mastered", value: "5+" },
    ],
    keyContributions: [
      "Led BDD/TDD testing initiatives using Cucumber, Robot Framework, and Selenium, drastically accelerating developer velocity and stakeholder visibility.",
      "Engineered automated UI and API test frameworks achieving 75%+ automated acceptance criteria coverage across client projects.",
      "Built specialized UI test automation for a major client's physical kitchen display system hardware terminals, validating new builds and firmware updates.",
      "Automated complex Salesforce workflows with Selenium and REST Assured for the world's largest nonprofit organization.",
      "Integrated automated test execution with Jenkins CI/CD pipelines to deliver data-driven release insights and regression safety.",
    ],
    engagements: [
      {
        title: "Hardware / Terminal Display Build Verification",
        category: "Hardware/Software Integration & Device Testing",
        description: "Built automated UI and build verification framework for a hospitality client's kitchen display hardware terminals, validating touch interfaces and real-time order synchronization across edge units.",
        achievements: [
          "Enabled continuous validation of new build images on client display terminals.",
          "Isolated timing issues between order dispatch backend and terminal rendering.",
        ],
        methodologies: [
          "Hardware / Software Integration Testing",
          "Build Image Verification",
          "Automated UI Testing",
          "Edge Terminal Validation",
        ],
        technologies: [
          "JavaScript",
          "Protractor",
          "Node.js",
          "Custom Terminal Harnesses",
        ],
        jobAlignmentNote: "Directly matches Amazon Leo's requirement for 'hardware/software development for hardware test', 'prototype and production builds', and 'subsystem validation'.",
      },
      {
        title: "Global Media Streaming BDD Platform",
        category: "Consumer Media & Cloud Web Applications",
        description: "Spearheaded behavioral-driven development (BDD) test automation for a global media streaming service's responsive web application.",
        achievements: [
          "Constructed cross-browser cloud grid tests using Sauce Labs and Jenkins.",
          "Trained engineering and product management on Gherkin feature specification.",
        ],
        methodologies: [
          "BDD / TDD with Gherkin",
          "Cloud Grid Parallel Execution",
          "CI/CD Jenkins Automation",
        ],
        technologies: [
          "Python",
          "Robot Framework",
          "Selenium WebDriver",
          "Sauce Labs",
          "Jenkins",
        ],
        jobAlignmentNote: "Aligns with 'programming with modern languages such as Python', 'CI/CD pipeline build processes', and 'mentoring engineers in automation'.",
      },
      {
        title: "Salesforce & Financial Asset Management Testing",
        category: "Enterprise Systems & Financial Database Integrity",
        description: "Engineered automated API and database regression testing suites for nonprofit donor operations and an international investment banking asset management tool.",
        achievements: [
          "Built REST Assured test suite validating Salesforce APIs.",
          "Created MySQL database test harness validating financial calculations without numeric drift.",
        ],
        methodologies: [
          "REST API Automation",
          "Database Integrity & Regression Testing",
          "Financial Calculation Validation",
        ],
        technologies: [
          "Java",
          "REST Assured",
          "MySQL",
          "MSTest",
        ],
        jobAlignmentNote: "Validates complex backend business logic, database consistency, and API contracts.",
      },
    ],
    coreTech: ["Python", "Java", "Cucumber", "Robot Framework", "REST Assured", "Jenkins", "MySQL"],
    jobPostingsMatch: [
      {
        title: "Hardware/Software Device Integration",
        description: "Developed test automation and build verification for physical kitchen display terminals and edge devices.",
      },
      {
        title: "BDD / TDD Cultural Transformation",
        description: "Pioneered Gherkin/Cucumber BDD practices bridging product requirements directly to executable code.",
      },
    ],
  },
];

export const JOB_KEYWORD_MATRIX = [
  {
    category: "Languages & Core Engineering",
    keywords: ["Python", "Java", "TypeScript", "JavaScript"],
    description: "Proficient across enterprise and scripting languages for building high-performance test harnesses, test automation frameworks, and test utilities.",
    experienceEvidence: "13 years writing Python, TypeScript, and Java across Google, LinkedIn, Addepar, and Slalom.",
  },
  {
    category: "Test Frameworks & Infrastructure",
    keywords: ["Playwright", "Selenium WebDriver", "WebDriverIO", "Checkly", "REST Assured", "gRPC", "Axe Accessibility"],
    description: "Architecting modular, reusable test frameworks adopted across dozens of products and global engineering teams.",
    experienceEvidence: "Created frameworks adopted by 32 public products at Google; built Playwright/Checkly at LinkedIn; agentic framework at Addepar.",
  },
  {
    category: "Distributed Systems & Cloud SaaS",
    keywords: ["AWS Cloud", "Kubernetes (K8s)", "Docker Containerization", "Asynchronous Event Flows", "Microservices (SOA)"],
    description: "End-to-end testing of complex distributed cloud architectures, contract testing, and async message validation.",
    experienceEvidence: "Validated cloud SaaS at Addepar (AWS), LinkedIn ($1B CRM), and Google (distributed gRPC services).",
  },
  {
    category: "Non-Functional & Reliability Engineering",
    keywords: ["Fault Injection & Resiliency", "JMeter Load / Stress Testing", "Performance Bottlenecks", "Latency Optimization", "Flakiness Reduction"],
    description: "Both building and breaking systems to prove resilience under peak traffic, high loads, and non-functional requirements.",
    experienceEvidence: "Architected JMeter load harness for LinkedIn CRM; reduced Google test flakiness by 5%; self-healing replay at Addepar.",
  },
  {
    category: "Systems, Hardware & Gate Reviews",
    keywords: ["Design for Testability (DFT)", "Hardware/Software Integration", "Gate Reviews & Sign-Offs", "Yield & Defect Leakage", "Requirements Traceability"],
    description: "Partnering with hardware and software architects early in the lifecycle to define test specifications and lead formal gates.",
    experienceEvidence: "Kitchen terminal hardware verification at Slalom; $30B compliance gate reviews at Google; 73% defect leakage drop at Addepar.",
  },
  {
    category: "AI Technologies & Modern Automation",
    keywords: ["Agentic E2E Execution", "AI Test Generation", "Self-Healing Automation", "Synthetic Test Data", "Workflow Acceleration"],
    description: "Leveraging state-of-the-art AI agents and LLM tooling to automate test creation and autonomously execute acceptance criteria.",
    experienceEvidence: "Engineered autonomous acceptance criteria runner at Addepar; boosted LinkedIn team velocity by 27% with AI test authoring.",
  },
  {
    category: "Technical Leadership & Mentorship",
    keywords: ["Tech Lead (US & India)", "Cross-Functional Collaboration", "Quality SME", "Mentoring Junior SDETs", "Developer Velocity Multiplier"],
    description: "Guiding distributed engineering teams, instilling shift-left quality culture, and transforming test engineering into a force multiplier.",
    experienceEvidence: "Tech lead for 6 SDETs at Google (-67% onboarding time); led US & India automation at LinkedIn; 13+ years total leadership.",
  },
];

export const EDUCATION_DATA = {
  institution: "University of Washington",
  degrees: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science and Engineering",
    },
    {
      degree: "Bachelor of Arts",
      field: "Business Administration",
    },
  ],
};

export const GIVING_BACK_DATA = [
  {
    title: "Quarters for Kids",
    role: "Board Member",
    details: [
      "Organized and filed for 501(c)(3) nonprofit status.",
      "Created and maintained website and digital presence, driving community awareness.",
      "Structured programs providing resources to underserved youth.",
    ],
  },
  {
    title: "AOK Friends",
    role: "Board Secretary & Treasurer",
    details: [
      "Organized homeless outreach initiative to achieve 501(c)(3) nonprofit designation.",
      "Managed fiscal budgets, disbursements, and regulatory reporting.",
      "Directly coordinated street outreach providing food, clothing, and life essentials.",
    ],
  },
  {
    title: "Slalom Volunteer Leadership",
    role: "Volunteer Committee Chair",
    details: [
      "Coordinated cross-border volunteer teams across the US and Canada to raise over $100,000 for hunger relief.",
      "Organized hands-on community service events at multiple regional nonprofit partners.",
      "Evaluated charitable grant applications and allocated corporate philanthropic funds.",
    ],
  },
];
