import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { CheckCircle2, Code2, Cpu, GitMerge, Shield } from 'lucide-react'

// Fixed: colors are CSS var strings — hex-appending ('hsl(var(--p))14') is invalid.
// Each reason now carries separate bg/border/text values.
const REASONS = [
  {
    icon:  Cpu,
    color: 'hsl(var(--neon))',
    bg:    'hsl(var(--neon) / .08)',
    bd:    'hsl(var(--neon) / .2)',
    title: 'I build complete full-stack systems, not just UI',
    body:  "Most junior developers are comfortable on one side of the stack. I've designed the DB schema, written the Spring Boot service layer, and built the React frontend — on the same feature, in the same sprint.",
    proof: 'Built Library Management System end-to-end: Oracle DB → Spring Boot API → Postman-tested, alone.',
  },
  {
    icon:  Shield,
    color: 'hsl(var(--violet))',
    bg:    'hsl(var(--violet) / .08)',
    bd:    'hsl(var(--violet) / .2)',
    title: 'I understand authentication, APIs, and data flow',
    body:  "I've implemented JWT access + refresh token patterns from scratch — not copy-pasted from a tutorial. I know why the security filter runs before the controller, and what happens if it doesn't.",
    proof: 'Implemented RESTful APIs with CRUD and role-based access control during training at Naresh I Technologies.',
  },
  {
    icon:  GitMerge,
    color: 'hsl(var(--cyan))',
    bg:    'hsl(var(--cyan) / .08)',
    bd:    'hsl(var(--cyan) / .2)',
    title: 'I focus on scalable, maintainable architecture',
    body:  "Layered architecture in Spring Boot isn't a buzzword to me — it's the difference between code you can refactor in 30 minutes and code that requires a week of untangling. I build the former.",
    proof: 'Built E-Commerce Application with separated service classes for product, user, and order concerns.',
  },
  {
    icon:  Code2,
    color: 'hsl(142 70% 55%)',
    bg:    'hsl(142 70% 55% / .08)',
    bd:    'hsl(142 70% 55% / .2)',
    title: 'I write code that others can work with',
    body:  "Meaningful naming, consistent response shapes, Swagger docs on every endpoint, PR-ready commits. I've had my code reviewed by senior engineers in production — I know what reviewers actually care about.",
    proof: 'Consistently follows Controller → Service → Repository with meaningful naming and Postman-tested APIs.',
  },
]

const EVIDENCE = [
  'Internship at Alumnus Software Limited · Jan–Apr 2025',
  '100+ coding challenges solved · LeetCode & Naukri',
  'TCS iON NQT score 1288.5 / 1800 · 71.58%',
  'Java Core & Advanced certified · LIT Bhubaneswar 2024',
]

export default function WhyHireMe() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper
      id="why-hire-me"
      eyebrow="06 / Why Hire Me"
      title={<>Why <span className="text-gradient">hire me</span></>}
    >
      <div ref={ref}>

        {/* ── 4 reason cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {REASONS.map(({ icon: Icon, color, bg, bd, title, body, proof }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: i * .12, ease: [0.22,1,0.36,1] }}
              className="gc sp rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Icon + title */}
              <div className="flex items-start gap-3.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${bd}` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <h3
                  className="font-display font-bold text-[.95rem] leading-snug pt-1.5"
                  style={{ color: 'hsl(var(--ink-1))' }}
                >
                  {title}
                </h3>
              </div>

              {/* Body */}
              <p className="text-[.82rem] font-body leading-relaxed" style={{ color: 'hsl(var(--ink-2))' }}>
                {body}
              </p>

              {/* Proof line */}
              <div
                className="flex items-start gap-2 pt-1"
                style={{ borderTop: `1px solid ${bd}` }}
              >
                <CheckCircle2 size={12} className="flex-shrink-0 mt-[2px]" style={{ color }} />
                <p className="font-mono-j text-[.66rem] leading-relaxed" style={{ color }}>
                  {proof}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Evidence strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .55, delay: .6, ease: [0.22,1,0.36,1] }}
          className="rounded-2xl p-5"
          style={{ background: 'hsl(var(--neon) / .06)', border: '1px solid hsl(var(--neon) / .18)' }}
        >
          <p
            className="font-mono-j text-[.58rem] uppercase tracking-[.18em] mb-4 text-center"
            style={{ color: 'hsl(var(--neon) / .7)' }}
          >
            Real evidence, not claims
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EVIDENCE.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: .95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: .45, delay: .7 + i * .07, ease: [0.22,1,0.36,1] }}
                className="flex items-start gap-2 rounded-xl px-3.5 py-3"
                style={{ background: 'hsl(var(--neon) / .08)', border: '1px solid hsl(var(--neon) / .18)' }}
              >
                <CheckCircle2 size={12} className="flex-shrink-0 mt-[2px]" style={{ color: 'hsl(var(--neon))' }} />
                <p className="text-[.76rem] font-body leading-relaxed" style={{ color: 'hsl(var(--neon))' }}>
                  {ev}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="text-center mt-5 text-[.82rem] font-body"
            style={{ color: 'hsl(var(--ink-2))' }}
          >
            Open to full-time Software Engineer roles — Java Full Stack or Backend. I can contribute from day one.
          </motion.p>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
