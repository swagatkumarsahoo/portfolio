import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GitBranch, Server } from 'lucide-react';

/* ── What is shipping right now ── */
const PROJECT = {
  name: 'Smart Inventory & Order Management System',

  description:
    'Full-stack backend system designed to manage inventory, orders, and user operations with secure APIs, structured database design, and scalable architecture. Built as part of advanced Java and Spring Boot training at Naresh I Technologies.',

  stack: [
    'Java',
    'Spring Boot',
    'Hibernate / JPA',
    'Oracle DB',
    'REST API',
    'Postman',
  ],

  completion: 80,
};

/* ── Concrete skills being deepened ── */
const BUILDING = [
  {
    icon: Server,
    label: 'Backend Architecture & Microservices Thinking',
    detail:
      'Designing scalable backend systems using Spring Boot, focusing on clean architecture, layered design, and service separation principles.',
    color: 'hsl(var(--p))',
  },
  {
    icon: GitBranch,
    label: 'Production Tools & Dev Workflow',
    detail:
      'Working with Git, GitHub, Maven, Jenkins, and Docker to understand real-world development workflows and deployment pipelines.',
    color: 'hsl(var(--p2))',
  },
  {
    icon: BookOpen,
    label: 'Cloud Deployment Fundamentals',
    detail:
      'Learning AWS services (EC2, S3, RDS) to deploy and manage backend applications in cloud environments.',
    color: 'hsl(var(--accent))',
  },
];

export default function CurrentlyBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="currently-building"
      ref={ref}
      className="section-outer"
      style={{ background: 'rgba(245,158,11,.02)' }}
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: '#f59e0b',
              boxShadow: '0 0 8px #f59e0b',
              animation: 'nowPulse 2s ease-in-out infinite',
            }}
          />
          <span
            className="font-mono-j text-[.65rem] uppercase tracking-[.2em]"
            style={{ color: '#f59e0b' }}
          >
            Now
          </span>
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{
              background:
                'linear-gradient(90deg,rgba(245,158,11,.4),transparent)',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-0">
          {/* ── Left: current project ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:pr-10"
          >
            <p
              className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-3"
              style={{ color: 'hsl(var(--ink-4))' }}
            >
              Currently shipping
            </p>

            <div className="gc rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3
                    className="font-display font-bold text-[.98rem] leading-tight mb-1"
                    style={{ color: 'hsl(var(--ink-1))' }}
                  >
                    {PROJECT.name}
                  </h3>
                  <span
                    className="font-mono-j text-[.58rem] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(245,158,11,.1)',
                      border: '1px solid rgba(245,158,11,.25)',
                      color: 'hsl(var(--gold))',
                    }}
                  >
                    In progress
                  </span>
                </div>
                {/* SVG progress ring */}
                <div className="relative w-11 h-11 flex-shrink-0">
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="rgba(255,255,255,.06)"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                      animate={
                        inView
                          ? {
                              strokeDashoffset:
                                2 *
                                Math.PI *
                                18 *
                                (1 - PROJECT.completion / 100),
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        delay: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: '22px 22px',
                      }}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center font-mono-j text-[.58rem]"
                    style={{ color: 'hsl(var(--gold))' }}
                  >
                    {PROJECT.completion}%
                  </span>
                </div>
              </div>

              <p
                className="text-[.81rem] font-body leading-relaxed mb-4"
                style={{ color: 'hsl(var(--ink-2))' }}
              >
                {PROJECT.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {PROJECT.stack.map((t) => (
                  <span
                    key={t}
                    className="chip chip-p text-[.6rem]"
                    style={{
                      color: 'hsl(var(--gold))',
                      borderColor: 'rgba(245,158,11,.25)',
                      background: 'rgba(245,158,11,.08)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block"
            style={{ background: 'rgba(255,255,255,.05)' }}
          />

          {/* ── Right: what I'm deepening ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:pl-10"
          >
            <p
              className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-4"
              style={{ color: 'hsl(var(--ink-4))' }}
            >
              What I'm improving
            </p>

            <div className="flex flex-col gap-4">
              {BUILDING.map(({ icon: Icon, label, detail, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `${color.slice(0, -1)} / .07)`,
                      border: `1px solid ${color.slice(0, -1)} / .18)`,
                    }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="font-display font-semibold text-[.84rem] mb-0.5"
                      style={{ color: 'hsl(var(--ink-1))' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[.76rem] font-body leading-relaxed"
                      style={{ color: 'hsl(var(--ink-3))' }}
                    >
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Career direction */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 rounded-xl p-4"
              style={{
                background: 'hsl(var(--p)/.06)',
                border: '1px solid hsl(var(--p)/.18)',
              }}
            >
              <p
                className="font-mono-j text-[.58rem] uppercase tracking-[.16em] mb-2"
                style={{ color: 'hsl(var(--neon)/.7)' }}
              >
                Preparing for
              </p>
              <p
                className="text-[.8rem] font-body leading-relaxed"
                style={{ color: 'hsl(var(--ink-2))' }}
              >
                Java Full Stack or Backend Software Engineer roles. I want to
                apply clean architecture and reliable API design in a team that
                ships real products.
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="status-dot" />
                <span
                  className="font-mono-j text-[.62rem]"
                  style={{ color: 'hsl(var(--p))' }}
                >
                  Actively interviewing · Available immediately
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
