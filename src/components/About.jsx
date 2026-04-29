import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { CheckCircle2 } from 'lucide-react';

const WHAT_I_BRING = [
  {
    label: 'Production-ready Java backend',
    detail:
      'Builds REST APIs using Spring Boot with layered architecture (Controller → Service → Repository), JPA/Hibernate, and clean exception handling.',
    color: 'hsl(var(--neon))',
  },
  {
    label: 'Real-world development exposure',
    detail:
      'Worked as Software Developer Intern at Alumnus Software Limited — contributed to backend modules, SQL optimisation, and debugging production issues.',
    color: 'hsl(var(--violet))',
  },
  {
    label: 'Full-stack capability',
    detail:
      'Integrates React frontends with Java backends, handles API contracts, state management, and responsive UI implementation.',
    color: 'hsl(var(--cyan))',
  },
  {
    label: 'Problem-solving mindset',
    detail:
      'Solved 100+ DSA problems. Strong focus on debugging, edge cases, and writing maintainable code for real-world scenarios.',
    color: 'hsl(155,80%,52%)',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <SectionWrapper id="about" eyebrow="01 / About" title="About me">
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start"
      >
        {/* ── Left: Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.96 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="about-photo-frame gc">
            <img
              src="/swagat2.jpeg"
              alt="Swagat Kumar Sahoo"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector(
                  '.photo-placeholder'
                ).style.display = 'flex';
              }}
            />
            <div
              className="photo-placeholder"
              style={{ display: 'none', minHeight: 340 }}
            >
              SKS
            </div>
          </div>

          {/* Floating Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="absolute -bottom-5 -right-4 gc sp rounded-2xl p-4 flex items-center gap-3"
            style={{ minWidth: 170 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'hsl(var(--neon)/.12)',
                border: '1px solid hsl(var(--neon)/.25)',
              }}
            >
              <span
                className="font-display font-bold text-sm"
                style={{ color: 'hsl(var(--neon))' }}
              >
                SKS
              </span>
            </div>

            <div>
              <p className="font-display font-semibold text-[.82rem]">
                Swagat Kumar
              </p>
              <p className="font-mono-j text-[.6rem] text-[hsl(var(--ink-4))]">
                Open to work
              </p>
            </div>

            <span className="status-dot ml-1" />
          </motion.div>
        </motion.div>

        {/* ── Right Content ── */}
        <div>
          {[
            <>
              I am a{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                Full Stack Java Developer
              </strong>{' '}
              building scalable web applications using{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                Spring Boot
              </strong>{' '}
              and{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                React
              </strong>
              . My focus is on clean architecture, efficient APIs, and
              production-ready code.
            </>,

            <>
              During my internship at{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                Alumnus Software Limited
              </strong>
              , I worked on backend development, optimised SQL queries, and
              resolved real-world bugs — gaining hands-on experience in a
              delivery environment.
            </>,

            <>
              I am currently strengthening my expertise in{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                Spring Boot, Microservices, and system design
              </strong>{' '}
              while actively preparing for full-time{' '}
              <strong className="text-[hsl(var(--ink-1))] font-medium">
                Software Engineer roles
              </strong>
              .
            </>,
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[.95rem] leading-[1.85] mb-4"
              style={{ color: 'hsl(var(--ink-2))' }}
            >
              {text}
            </motion.p>
          ))}

          {/* What I bring */}
          <p className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-3 mt-6 text-[hsl(var(--ink-4))]">
            What I bring
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHAT_I_BRING.map(({ label, detail, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                }}
                className="gc sp rounded-xl p-4 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="mt-[2px]"
                    style={{ color }}
                  />
                  <div>
                    <p className="font-display font-semibold text-[.85rem] mb-1">
                      {label}
                    </p>
                    <p className="text-[.78rem] leading-relaxed text-[hsl(var(--ink-3))]">
                      {detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
