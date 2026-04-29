import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Github,
  Star,
  Zap,
} from 'lucide-react';

// ── Real projects from resume ──────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Loan Management System',
    tagline:
      'End-to-end loan lifecycle system with application processing, eligibility checks, EMI calculation, and repayment tracking',
    impact:
      'Built to simulate real banking workflows — from loan application to approval, EMI scheduling, repayment tracking, and loan closure — using Spring Boot backend and Oracle SQL with PL/SQL business rules.',

    image: '/projects/loan-management-system.png',
    strengths: [
      'Designed REST APIs for loan application, approval workflow, EMI calculation, and repayment tracking using Spring Boot',
      'Implemented PL/SQL procedures to enforce eligibility rules, credit checks, and EMI computation at database level',
    ],
    challenges: [
      'Built multi-stage loan lifecycle flow: Applied → Under Review → Approved/Rejected → Active Loan → Closed',
      'Implemented EMI calculation logic with interest rate, tenure, and principal using backend service layer',
      'Ensured data consistency between loan status updates and repayment records across multiple tables',
    ],
    production: [
      'Separated system into modules: User Management, Loan Processing, and Repayment Service for scalability',
      'Used transaction management to ensure loan approval and EMI schedule creation are atomic operations',
      'Database constraints + PL/SQL validations ensured no loan is approved without eligibility check',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'REST API',
      'MySQL',
      'PL/SQL',
      'Hibernate',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    accentColor: '#7c3aed',
    github: 'https://github.com/swagatkumarsahoo',
    demo: null,
  },
  {
    title: 'Real-Time Chat Application (WhatsApp-like)',
    tagline:
      'Secure real-time messaging system with one-to-one chat, online presence tracking, and WebSocket-based communication',
    impact:
      'Built to understand real-world messaging systems like WhatsApp — including real-time communication using WebSockets, user authentication, chat persistence, and online/offline status tracking.',

    image: '/projects/whatsapp-like-chatapp.png',
    strengths: [
      'Built real-time messaging using Spring Boot WebSocket (STOMP) for instant message delivery between users',
      'Implemented JWT-based authentication for secure login and protected chat APIs',
      'Designed chat persistence system using Oracle SQL to store users, messages, and conversation history',
    ],
    challenges: [
      'Integrated WebSocket communication with Spring Boot REST APIs for hybrid architecture (REST + real-time messaging)',
      'Managed message delivery flow (sender → server → receiver) ensuring no message loss and proper acknowledgment handling',
      'Handled user presence system (online/offline status tracking) using session management',
    ],
    production: [
      'Separated system into modules: Authentication Service, Chat Service, and User Service for scalability',
      'Used WebSocket session registry to track active users and enable real-time status updates',
      'Stored chat history in relational database ensuring message retrieval even after reconnection',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'WebSocket (STOMP)',
      'JWT Authentication',
      'MySQL',
      'PL/SQL',
      'REST API',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    accentColor: '#7c3aed',
    github: 'https://github.com/swagatkumarsahoo',
    demo: null,
  },
  {
    title: 'Library Management System',
    tagline:
      'Full-stack library operations platform with REST API and layered architecture',
    impact:
      'Java web application to manage book inventory, user records, and issue/return tracking. Built with Spring Boot REST APIs and Oracle Database — tested end-to-end with Postman.',
    image: '/projects/library-management-system.webp',
    strengths: [
      'RESTful API layer using Spring Boot for full CRUD operations on library resources',
      'Hibernate (JPA) for object–relational mapping with Oracle Database for persistent storage',
    ],
    challenges: [
      'Designed PL/SQL procedures for data validations to keep business logic at the database layer rather than scattered across the codebase.',
      'Applied Controller → Service → Repository layered architecture — each layer independently testable and replaceable.',
    ],
    production: [
      'Followed layered architecture (Controller → Service → Repository) for maintainability and testability',
      'Implemented input validation and exception handling to prevent bad data from reaching the service layer',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'Hibernate / JPA',
      'Oracle SQL',
      'PL/SQL',
      'REST API',
      'Postman',
    ],
    accentColor: '#7c3aed',
    github: 'https://github.com/swagatkumarsahoo',
    demo: null,
  },
  {
    title: 'E-Commerce Application',
    tagline:
      'Full-stack e-commerce backend with product catalog, user registration, and order management',
    impact:
      'Built to understand real-world product catalog, user registration, and order processing workflows — REST API backend in Spring Boot with an HTML/CSS/JavaScript frontend.',
    image: '/projects/e-commerce-application.jpg',
    strengths: [
      'Spring Boot REST APIs for product, user, and order management — connected to a live JavaScript frontend',
      'Oracle SQL queries designed for product, user, and order data; PL/SQL blocks handle validations and business logic',
    ],
    challenges: [
      'Connected a plain HTML/CSS/JavaScript frontend to Spring Boot APIs using fetch() — built without any frontend framework to understand the raw request/response cycle.',
      'Structured the backend so product, user, and order concerns stayed in separate service classes — changes to one did not break others.',
    ],
    production: [
      'Separated concerns: independent service classes for product catalog, users, and orders keep the codebase maintainable',
      'PL/SQL validations enforce data integrity rules at the database layer, independent of the application tier',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'Oracle SQL',
      'PL/SQL',
      'REST API',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    accentColor: '#06b6d4',
    github: 'https://github.com/swagatkumarsahoo',
    demo: null,
  },
  {
    title: 'Personal Developer Portfolio',
    tagline:
      'Modern full-stack personal portfolio showcasing projects, skills, and development journey with interactive UI and responsive design',

    impact:
      'Built to present my software engineering skills, projects, and technical growth in a structured and professional way — designed with a focus on real-world recruiter expectations and clean UI/UX principles.',

    image: '/projects/portfolio.png',
    strengths: [
      'Developed responsive frontend using HTML, CSS, and JavaScript with modern UI layout and component-based structure',
      'Organized projects dynamically to showcase real-world applications like e-commerce, chat system, and loan management system',
    ],
    challenges: [
      'Designed clean and responsive UI without using heavy frontend frameworks to strengthen core frontend fundamentals',
      'Structured project data in reusable format to dynamically render portfolio sections without duplication',
    ],
    production: [
      'Implemented modular project structure to easily scale and add new projects without breaking existing UI',
      'Optimized layout for recruiter readability with clear sections: skills, projects, and technical stack',
    ],
    stack: [
      'HTML',
      'JavaScript',
      'Sass',
      'React',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive Design',
    ],
    accentColor: '#06b6d4',
    github: 'https://github.com/swagatkumarsahoo',
    demo: 'https://friendly-sherbet-50f474.netlify.app/',
  },
  {
    title: 'FinFlow — Finance Analytics Dashboard',
    tagline:
      'Interactive financial dashboard for real-time insights, data visualization, and user-centric analytics',
    impact:
      'Built a responsive finance dashboard to visualize key metrics like revenue, transactions, and performance trends, focusing on clarity, usability, and smooth user interaction.',

    image: '/projects/finance-dashboard.png',
    strengths: [
      'Designed clean and intuitive dashboard layout for quick data interpretation',
      'Implemented interactive charts and UI components for better user engagement',
      'Built fully responsive UI ensuring seamless experience across devices',
    ],
    challenges: [
      'Structured complex financial data into simple, readable UI components',
      'Maintained consistent spacing, alignment, and visual hierarchy across dashboard sections',
    ],
    production: [
      'Component-based architecture for scalability and reuse',
      'Optimized rendering for smooth performance even with multiple UI elements',
      'Designed with real-world dashboard usability principles (clarity, hierarchy, accessibility)',
    ],
    stack: [
      'React',
      'Tailwind CSS',
      'JavaScript',
      'Chart UI',
      'Responsive Design',
    ],
    accentColor: '#06b6d4',
    github: 'https://github.com/swagatkumarsahoo',
    demo: 'https://finance-dashboard-iota-tan.vercel.app/',
  },
];

const TC = {
  '#7c3aed': {
    color: 'hsl(var(--neon))',
    bg: 'hsl(var(--neon)/.09)',
    border: 'hsl(var(--neon)/.28)',
  },
  '#3b82f6': {
    color: 'hsl(var(--violet))',
    bg: 'hsl(var(--violet)/.09)',
    border: 'hsl(var(--violet)/.28)',
  },
  '#06b6d4': {
    color: 'hsl(var(--cyan))',
    bg: 'hsl(var(--cyan)/.09)',
    border: 'hsl(var(--cyan)/.28)',
  },
};

function ProjectCard({ p, i, inView }) {
  const cardRef = useRef(null);
  const tc = TC[p.accentColor];

  const rect = useRef(null);

  const onEnter = useCallback(() => {
    rect.current = cardRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const onMove = useCallback((e) => {
    if (!rect.current) return;
    cardRef.current.style.setProperty(
      '--mx',
      `${e.clientX - rect.current.left}px`
    );
    cardRef.current.style.setProperty(
      '--my',
      `${e.clientY - rect.current.top}px`
    );
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      className="gc sp rounded-2xl flex flex-col overflow-hidden group"
    >
      {/* Accent stripe */}
      <div
        className="h-[2px] flex-shrink-0"
        style={{
          background: `linear-gradient(90deg,${p.accentColor}95,transparent)`,
        }}
      />

      {/* Project image */}
      <div className="relative overflow-hidden" style={{ height: 150 }}>
        <img
          src={p.image}
          alt={`${p.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling)
              e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          style={{
            display: 'none',
            height: 150,
            background: `linear-gradient(135deg,${p.accentColor}15,transparent)`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-display font-bold text-4xl"
            style={{ color: `${p.accentColor}50` }}
          >
            {p.title[0]}
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--bg-2)/.9) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Header */}
      <div
        className="px-5 pt-4 pb-3"
        style={{
          background: `linear-gradient(160deg,${p.accentColor}0d,transparent 55%)`,
        }}
      >
        <h3
          className="font-display font-bold text-[.98rem] leading-tight mb-1"
          style={{ color: 'hsl(var(--ink-1))' }}
        >
          {p.title}
        </h3>
        <p
          className="text-[.72rem] font-body font-medium mb-2"
          style={{ color: p.accentColor }}
        >
          {p.tagline}
        </p>
        <p
          className="text-[.81rem] font-body leading-relaxed"
          style={{ color: 'hsl(var(--ink-2))' }}
        >
          {p.impact}
        </p>
      </div>

      {/* What makes this project strong */}
      <div className="px-5 pb-3">
        <p
          className="font-mono-j text-[.57rem] uppercase tracking-[.16em] mb-2"
          style={{ color: `${p.accentColor}bb` }}
        >
          What makes this project strong
        </p>
        <ul className="flex flex-col gap-1.5">
          {p.strengths.map((b, j) => (
            <li key={j} className="flex items-start gap-2">
              <CheckCircle2
                size={12}
                className="flex-shrink-0 mt-[2px]"
                style={{ color: p.accentColor }}
              />
              <span
                className="text-[.77rem] font-body leading-relaxed"
                style={{ color: 'hsl(var(--ink-2))' }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Challenges / decisions */}
      <div
        className="mx-5 mb-3 rounded-lg px-3.5 py-2.5"
        style={{
          background: `${p.accentColor}07`,
          border: `1px solid ${p.accentColor}22`,
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <AlertCircle
            size={11}
            style={{ color: p.accentColor, flexShrink: 0 }}
          />
          <span
            className="font-mono-j text-[.57rem] uppercase tracking-[.14em]"
            style={{ color: `${p.accentColor}cc` }}
          >
            Engineering decisions
          </span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {p.challenges.map((ch, k) => (
            <li key={k} className="flex items-start gap-2">
              <span
                className="font-mono-j text-[.62rem] mt-[1px] flex-shrink-0"
                style={{ color: `${p.accentColor}88` }}
              >
                {k + 1}.
              </span>
              <span
                className="text-[.75rem] font-body leading-relaxed"
                style={{ color: 'hsl(var(--ink-2))' }}
              >
                {ch}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Production considerations */}
      <div
        className="mx-5 mb-3 rounded-lg px-3.5 py-2.5"
        style={{
          background: 'hsl(var(--neon)/.04)',
          border: '1px solid hsl(var(--neon)/.12)',
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Zap
            size={11}
            style={{ color: 'hsl(var(--neon))', opacity: 0.8, flexShrink: 0 }}
          />
          <span
            className="font-mono-j text-[.57rem] uppercase tracking-[.14em]"
            style={{ color: 'hsl(var(--neon)/.7)' }}
          >
            Production considerations
          </span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {p.production.map((pt, k) => (
            <li key={k} className="flex items-start gap-2">
              <span
                className="font-mono-j text-[.62rem] mt-[1px] flex-shrink-0"
                style={{ color: 'hsl(var(--neon)/.4)' }}
              >
                ·
              </span>
              <span
                className="text-[.75rem] font-body leading-relaxed"
                style={{ color: 'hsl(var(--ink-3))' }}
              >
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack chips */}
      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        {p.stack.map((t) => (
          <span
            key={t}
            className="chip text-[.61rem]"
            style={{
              color: tc.color,
              borderColor: tc.border,
              background: tc.bg,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div
        className="px-5 py-3.5 flex items-center gap-4 mt-auto"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <Github size={13} /> View on GitHub
        </a>
        {p.demo ? (
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link ml-auto"
            style={{ color: 'hsl(var(--neon))' }}
          >
            Live Site <ExternalLink size={12} />
          </a>
        ) : (
          <span
            className="ml-auto font-mono-j text-[.62rem]"
            style={{ color: 'hsl(var(--ink-4))' }}
          >
            Demo coming soon
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <SectionWrapper
      id="projects"
      eyebrow="05 / Projects"
      title={
        <>
          Selected <span className="text-gradient">work</span>
        </>
      }
    >
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} inView={inView} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <a
          href="https://github.com/swagatkumarsahoo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost inline-flex"
        >
          <Github size={14} /> More on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
