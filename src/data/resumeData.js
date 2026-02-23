// ============================================================
//  RESUME DATA — Maheshwar Muthukumar
// ============================================================

export const personalInfo = {
    name: "Maheshwar Muthukumar",
    title: "Backend Developer",
    subtitle: "Building scalable and maintainable backend systems",
    location: "Chennai, India",
    email: "mmkganeshwar@gmail.com",
    phone: "+919629211668",
    github: "https://github.com/zealousMW",
    linkedin: "https://linkedin.com/in/maheshwar-muthukumar",
    portfolio: "https://example.com/zealous-os",
    avatar: null,
    bio: "Backend Developer with practical experience in Java, Node.js, and SQL. Currently working on backend development for an accounting software system. Experienced in building REST APIs, handling databases, and implementing authentication features.",
    systemStats: {
        projects: 3,
        commits: null,
        coffees: "∞",
        uptime: "3 yrs",
    }
};

export const skills = [
    {
        category: "Languages",
        icon: "💬",
        color: "#8b5cf6",
        packages: [
            { name: "Java", version: "—", level: 85, status: "active" },
            { name: "JavaScript", version: "—", level: 80, status: "active" },
            { name: "SQL", version: "—", level: 85, status: "active" },
            { name: "Python", version: "—", level: 70, status: "idle" },
            { name: "HTML/CSS", version: "—", level: 75, status: "active" },
            { name: "C++", version: "—", level: 60, status: "idle" },
        ],
    },
    {
        category: "Frameworks",
        icon: "⚙️",
        color: "#10b981",
        packages: [
            { name: "Node.js", version: "—", level: 85, status: "active" },
            { name: "Express.js", version: "—", level: 85, status: "active" },
            { name: "React.js", version: "—", level: 75, status: "active" },
            { name: "Next.js", version: "—", level: 75, status: "active" },
            { name: "Spring Boot", version: "—", level: 70, status: "active" },
            { name: "Flask", version: "—", level: 60, status: "idle" },
            { name: "Tailwind CSS", version: "—", level: 80, status: "active" },
        ],
    },
    {
        category: "Database",
        icon: "🗄️",
        color: "#f59e0b",
        packages: [
            { name: "MySQL", version: "—", level: 85, status: "active" },
            { name: "Supabase (PostgreSQL)", version: "—", level: 80, status: "active" },
        ],
    },
    {
        category: "Dev Tools",
        icon: "🛠️",
        color: "#06b6d4",
        packages: [
            { name: "Git", version: "—", level: 85, status: "active" },
            { name: "GitHub", version: "—", level: 85, status: "active" },
            { name: "VS Code", version: "—", level: 90, status: "active" },
        ],
    },
];

export const experience = [
    {
        id: "EXP-001",
        role: "Backend Developer Intern",
        company: "EazeAccounts",
        location: "India",
        period: "November 2025 — Present",
        startDate: "2025-11-01",
        type: "INTERNSHIP",
        status: "running",
        description: "Built and improved backend services for accounting software, making the system faster and more reliable.",
        bullets: [
            "Reduced database response time by 40% by optimizing queries and improving data handling",
            "Created REST APIs for transactions, reports, and automatic data matching",
            "Cleaned up old code to make it easier to maintain and reduce technical issues",
            "Worked with team members in agile sprints and took part in code reviews",
        ],
        tech: ["Java", "Node.js", "SQL", "REST APIs"],
        color: "#5e81f4",
        pid: 1201,
    },
];

export const projects = [
    {
        id: "PRJ-001",
        name: "Hospital Management System",
        process: "hospital-mgmt.exe",
        status: "running",
        cpu: "2.1%",
        memory: "96 MB",
        description: "System to manage patient records, prescriptions, and medicine inventory",
        longDescription: "Developed a system to manage patient records, prescriptions, and medicine inventory, aiming to reduce administrative workload by half. Implemented patient registration with support for inpatients (bed allocation, discharge tracking, daily medication management) and outpatients (doctor assignment and prescription generation). Added dynamic reporting for efficient data monitoring.",
        tech: ["Next.js", "React", "Supabase (PostgreSQL)", "Tailwind CSS"],
        github: "https://github.com/zealousMW/hospital-management-system",
        live: null,
        stars: null,
        forks: null,
        color: "#5e81f4",
        icon: "🏥",
        featured: true,
        pid: 4201,
        uptime: "—",
        period: "January — March 2025",
    },
    {
        id: "PRJ-002",
        name: "Disaster Response Platform",
        process: "disaster-response.exe",
        status: "running",
        cpu: "3.4%",
        memory: "128 MB",
        description: "Disaster data management system with real-time social media monitoring and geospatial mapping",
        longDescription: "Built disaster data management system with CRUD, audit tracking, location extraction, and geocoding via Google Gemini & Maps APIs. Integrated real-time social media monitoring (Twitter/Bluesky), geospatial resource mapping, and verified image analysis for disaster events. Optimized backend using Supabase geospatial indexes, API caching, structured logs, and rate-limited external API calls.",
        tech: ["Express.js", "Supabase", "Google Gemini API", "Bluesky API", "Node.js"],
        github: "https://github.com/zealousMW/Disaster-Response-Coordination-Platform",
        live: null,
        stars: null,
        forks: null,
        color: "#10b981",
        icon: "🚨",
        featured: true,
        pid: 3872,
        uptime: "—",
        period: "June 2025",
    },
    {
        id: "PRJ-003",
        name: "Credit Card Management System",
        process: "credit-card-mgmt.exe",
        status: "idle",
        cpu: "0.5%",
        memory: "64 MB",
        description: "Secure full-stack credit card management platform with AI-powered financial insights",
        longDescription: "Built a secure full-stack credit card management platform with JWT-based authentication, bcrypt password hashing, and AES-256-CBC encryption for sensitive financial data. Developed protected RESTful CRUD APIs with a normalized data model supporting transaction categorization, billing cycles, and comprehensive financial analytics. Integrated Google Gemini Pro AI to generate personalized financial insights including spending pattern analysis, risk scoring, budget recommendations, and predictive financial advice.",
        tech: ["Next.js", "Node.js", "Express.js", "MySQL", "Google Gemini Pro API", "Recharts"],
        github: "https://github.com/zealousMW/Credit-Card-Management-System",
        live: null,
        stars: null,
        forks: null,
        color: "#f59e0b",
        icon: "💳",
        featured: true,
        pid: 3541,
        uptime: "—",
        period: "—",
    },
];

export const education = [
    {
        degree: "BE in Computer Science and Engineering",
        institution: "Anna University Regional Campus",
        location: "India",
        period: "September 2022 — August 2025",
        gpa: "7.8 / 10",
        color: "#5e81f4",
    },
    {
        degree: "Diploma in Computer Engineering",
        institution: "Vidyalankar Polytechnic",
        location: "India",
        period: "June 2019 — August 2022",
        gpa: "9.10 / 10",
        color: "#10b981",
    },
];

export const terminalCommands = {
    help: {
        output: `
╔══════════════════════════════════════════╗
║      ZEALOUS OS — Available Commands     ║
╚══════════════════════════════════════════╝

  resume     → Download PDF resume
  email      → Open email client
  github     → Open GitHub profile
  skills     → List all skills
  whoami     → System user info
  projects   → List all projects
  clear      → Clear terminal
  help       → Show this menu
    doom       → Launch DOOM (1993) 🔫 (mobile warns first)
    `.trim(),
        action: null,
    },
    whoami: {
        output: `maheshwar@zealous-os:~$ whoami\n> Maheshwar Muthukumar\n> Backend Developer\n> Chennai, India 🌏\n> Available for exciting opportunities!`,
        action: null,
    },
    email: {
        output: `📧 Opening mail client...\n   mailto:mmkganeshwar@gmail.com`,
        action: () => window.open("mailto:mmkganeshwar@gmail.com"),
    },
    github: {
        output: `🐙 Opening GitHub profile...\n   https://github.com/zealousMW`,
        action: () => window.open("https://github.com/zealousMW", "_blank"),
    },
    resume: {
        output: `📄 Preparing resume download...\n   File: maheshwar-muthukumar_resume.pdf\n   ✅ Download triggered!`,
        action: () => alert("Resume download would trigger here!"),
    },
    skills: {
        output: `🛠️ INSTALLED PACKAGES:\n\n  Languages  → Java, JavaScript, SQL, Python, C++\n  Frameworks → Node.js, Express.js, React.js, Next.js, Spring Boot\n  Database   → MySQL, Supabase (PostgreSQL)\n  Dev Tools  → Git, GitHub, VS Code`,
        action: null,
    },
    projects: {
        output: `⚡ RUNNING PROCESSES:\n\n  [4201] HospitalMgmt      RUNNING  2.1% CPU\n  [3872] DisasterResponse  RUNNING  3.4% CPU\n  [3541] CreditCardMgmt   IDLE     0.5% CPU`,
        action: null,
    },
    clear: {
        output: null,
        action: null,
        clear: true,
    },
};