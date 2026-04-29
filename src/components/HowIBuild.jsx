import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { CheckCircle2, FileText, Layers, Lock, Zap } from 'lucide-react'

const FLOW_NODES = [
  { label: 'User',               sub: 'Browser / Mobile',                    color: 'hsl(var(--ink-2))', bg: 'rgba(161,161,188,.08)', border: 'rgba(161,161,188,.25)' },
  { label: 'React Frontend',     sub: 'Axios · JWT header · Custom hooks',    color: 'hsl(var(--p2))', bg: 'hsl(var(--violet)/.08)',  border: 'hsl(var(--violet)/.28)'  },
  { label: 'REST API',           sub: 'HTTPS · JSON · Swagger docs',          color: 'hsl(var(--p))', bg: 'hsl(var(--neon)/.08)', border: 'hsl(var(--neon)/.28)'  },
  { label: 'Spring Boot Backend',sub: 'Controller → Service → Repository',   color: 'hsl(var(--p))', bg: 'hsl(var(--neon)/.08)', border: 'hsl(var(--neon)/.28)'  },
  { label: 'Database',           sub: 'MySQL / Oracle · JPA / Hibernate',    color: 'hsl(var(--accent))', bg: 'hsl(var(--accent)/.08)',  border: 'hsl(var(--accent)/.28)'   },
]

const JWT_STEPS = [
  { step: '1', text: 'User submits credentials — server validates against the DB' },
  { step: '2', text: 'Server signs and returns access token (15 min) + refresh token (7 days)' },
  { step: '3', text: 'React attaches the access token to every outgoing request header' },
  { step: '4', text: 'Spring Security filter validates the token before any controller runs' },
  { step: '5', text: 'On expiry, React silently exchanges the refresh token — user never re-logs in' },
]

/* ── NEW: Engineering decision rationale ── */
const DECISIONS = [
  {
    icon: Lock,
    title: 'JWT over sessions',
    body: 'Sessions require server-side state — every node in a cluster must share it. JWTs are self-contained and stateless, so the backend scales horizontally with zero coordination overhead.',
    color: 'hsl(var(--p))',
  },
  {
    icon: Zap,
    title: 'REST over alternatives',
    body: 'REST maps naturally to HTTP verbs, is cacheable, and every developer understands it. No schema negotiation, no special client libraries — just JSON over HTTPS, fully Swagger-documented.',
    color: 'hsl(var(--p2))',
  },
  {
    icon: Layers,
    title: 'Separated frontend and backend',
    body: 'A React SPA consuming a JSON API can be deployed, versioned, and scaled independently. The frontend has no idea how the backend is implemented — and that is correct.',
    color: 'hsl(var(--accent))',
  },
  {
    icon: FileText,
    title: 'Layered Spring Boot architecture',
    body: 'Controller handles HTTP, Service owns business rules, Repository handles persistence. Each layer is independently testable. Mixing them — even once — makes refactoring exponentially harder.',
    color: 'hsl(142 70% 55%)',
  },
]

const DESIGN_NOTES = [
  'Every request hits Spring Security before the controller sees it',
  'JWT is stateless — no server session, scales horizontally without shared state',
  '@Transactional on service layer means all-or-nothing — partial writes are impossible',
  'Repository is the only layer allowed to touch the database',
]

const PRINCIPLES = [
  { icon: Lock,     title: 'Security first',       body: 'JWT access + refresh pattern. Spring Security filter chain validates every request. @PreAuthorize enforces permissions at the method level.', color: 'hsl(var(--p))' },
  { icon: Layers,   title: 'Layered architecture', body: 'Controller → Service → Repository. Each layer has one job. Business logic never leaks into controllers. DB never leaks into services.',      color: 'hsl(var(--p2))' },
  { icon: FileText, title: 'Documented at PR time', body: 'Swagger / OpenAPI annotations on every endpoint. API contracts are part of the commit, not written retrospectively.',                       color: 'hsl(var(--accent))' },
]

function Arrow({ inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
      transition={{ duration: .32, delay, ease: [0.22,1,0.36,1] }}
      className="flex flex-col items-center gap-0.5 my-1"
      style={{ transformOrigin: 'top center' }}
    >
      <div className="w-px h-5" style={{ background: 'hsl(var(--neon)/.4)' }} />
      <svg width="10" height="7" viewBox="0 0 10 7">
        <path d="M5 7L0 0h10z" fill="hsl(var(--neon)/.5)" />
      </svg>
    </motion.div>
  )
}

export default function HowIBuild() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper id="how-i-build" eyebrow="04 / How I Build" title="How I build a request">
      <div ref={ref} className="space-y-8">

        {/* ── Diagram + JWT steps ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Flow diagram */}
          <div className="flex flex-col items-center">
            <p className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-5" style={{ color: 'hsl(var(--ink-4))' }}>
              Request lifecycle
            </p>
            {FLOW_NODES.map((node, i) => (
              <div key={node.label} className="w-full flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: .5, delay: .05 + i * .1, ease: [0.22,1,0.36,1] }}
                  className="w-full rounded-xl px-4 py-3 text-center"
                  style={{ background: node.bg, border: `1px solid ${node.border}` }}
                >
                  <p className="font-display font-semibold text-[.88rem]" style={{ color: 'hsl(var(--ink-1))' }}>
                    {node.label}
                  </p>
                  <p className="font-mono-j text-[.6rem] mt-0.5" style={{ color: node.color }}>
                    {node.sub}
                  </p>
                </motion.div>
                {i < FLOW_NODES.length - 1 && <Arrow inView={inView} delay={.12 + i * .1} />}
              </div>
            ))}
          </div>

          {/* JWT auth flow */}
          <div>
            <p className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-5" style={{ color: 'hsl(var(--ink-4))' }}>
              JWT authentication flow
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {JWT_STEPS.map(({ step, text }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: .45, delay: .2 + i * .09, ease: [0.22,1,0.36,1] }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono-j text-[.62rem] font-medium"
                    style={{ background: 'hsl(var(--neon)/.14)', border: '1px solid hsl(var(--neon)/.3)', color: 'hsl(var(--p))' }}
                  >
                    {step}
                  </div>
                  <p className="text-[.82rem] font-body leading-relaxed pt-0.5" style={{ color: 'hsl(var(--ink-2))' }}>
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Token anatomy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .5, delay: .75, ease: [0.22,1,0.36,1] }}
              className="rounded-xl p-4"
              style={{ background: 'hsl(var(--p)/.06)', border: '1px solid hsl(var(--p)/.18)' }}
            >
              <p className="font-mono-j text-[.58rem] uppercase tracking-[.16em] mb-3" style={{ color: 'hsl(var(--neon)/.7)' }}>
                Token structure
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { part: 'Header',    note: 'alg: HS256',   c: '#93c5fd', bg: 'rgba(59,130,246,.14)',  bd: 'hsl(var(--violet)/.28)'  },
                  { part: '.',         note: '',             c: 'hsl(var(--ink-4))', bg: 'transparent',            bd: 'transparent'           },
                  { part: 'Payload',   note: 'userId, role', c: '#c4b5fd', bg: 'hsl(var(--neon)/.14)',  bd: 'hsl(var(--neon)/.28)'  },
                  { part: '.',         note: '',             c: 'hsl(var(--ink-4))', bg: 'transparent',            bd: 'transparent'           },
                  { part: 'Signature', note: 'HMAC-SHA256',  c: '#6ee7b7', bg: 'rgba(16,185,129,.1)',   bd: 'rgba(16,185,129,.25)'  },
                ].map(({ part, note, c, bg, bd }, j) => (
                  note === '' ? (
                    <span key={j} className="font-mono-j text-base font-bold" style={{ color: 'hsl(var(--ink-4))' }}>{part}</span>
                  ) : (
                    <span key={j}
                      className="inline-flex flex-col items-center px-2.5 py-1.5 rounded-lg font-mono-j text-[.6rem]"
                      style={{ background: bg, border: `1px solid ${bd}`, color: c }}
                    >
                      <span className="font-medium">{part}</span>
                      <span style={{ color: `${c}99`, fontSize: '.54rem' }}>{note}</span>
                    </span>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Design notes ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .55, delay: .9, ease: [0.22,1,0.36,1] }}
          className="gc rounded-xl p-5"
        >
          <p className="font-mono-j text-[.58rem] uppercase tracking-[.16em] mb-4" style={{ color: 'hsl(var(--ink-4))' }}>
            Design decisions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
            {DESIGN_NOTES.map((note, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--p))' }} />
                <p className="text-[.78rem] font-body leading-relaxed" style={{ color: 'hsl(var(--ink-2))' }}>{note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Key Engineering Decisions (NEW) ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .5, delay: 1.0, ease: [0.22,1,0.36,1] }}
            className="mb-5"
          >
            <p className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-1" style={{ color: 'hsl(var(--ink-4))' }}>
              Key engineering decisions
            </p>
            <p className="text-[.8rem] font-body" style={{ color: 'hsl(var(--ink-3))' }}>
              Every architectural choice has a reason. Here's the thinking behind the ones that matter most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DECISIONS.map(({ icon: Icon, title, body, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: .55, delay: 1.05 + i * .1, ease: [0.22,1,0.36,1] }}
                className="gc sp rounded-xl p-4"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color.slice(0,-1)} / .08)`, border: `1px solid ${color.slice(0,-1)} / .18)` }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>
                  <h3 className="font-display font-semibold text-[.84rem]" style={{ color: 'hsl(var(--ink-1))' }}>
                    {title}
                  </h3>
                </div>
                <p className="text-[.77rem] font-body leading-relaxed" style={{ color: 'hsl(var(--ink-3))' }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Engineering principles ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRINCIPLES.map(({ icon: Icon, title, body, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .55, delay: 1.5 + i * .1, ease: [0.22,1,0.36,1] }}
              className="gc sp rounded-xl p-5"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${color.slice(0,-1)} / .08)`, border: `1px solid ${color.slice(0,-1)} / .18)` }}>
                  <Icon size={13} style={{ color }} />
                </div>
                <h3 className="font-display font-semibold text-[.85rem]" style={{ color: 'hsl(var(--ink-1))' }}>{title}</h3>
              </div>
              <p className="text-[.77rem] leading-relaxed font-body" style={{ color: 'hsl(var(--ink-3))' }}>{body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
