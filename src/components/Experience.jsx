import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react'

// ── Real data from resume ──────────────────────────────────────────────────
const EXPERIENCE = [
  {
    role:     'Full Stack Java Developer – Trainee',
    company:  'Naresh I Technologies',
    duration: 'June 2025 – Present',
    location: 'Hyderabad, India · On-site',
    type:     'Training',
    highlights: [
      'Developing and testing Java-based web applications using Core Java, Spring Boot, Hibernate (JPA), and Oracle Database',
      'Implementing RESTful APIs to support CRUD operations and basic role-based access control',
      'Building structured training projects including a Library Management System and an E-Commerce Application',
      'Applying Core Java concepts: OOP principles, Collections Framework, and Exception Handling',
      'Following Agile development practices using Git and GitHub for version control',
    ],
    stack: ['Java', 'Spring Boot', 'Hibernate / JPA', 'Oracle DB', 'REST API', 'Git', 'Agile'],
  },
  {
    role:     'Software Developer – Intern',
    company:  'Alumnus Software Limited',
    duration: 'Jan 2025 – Apr 2025',
    location: 'Kolkata, India · On-site',
    type:     'Internship',
    highlights: [
      'Supported development and maintenance of Java backend components under senior developer guidance',
      'Assisted in database integration and SQL query optimisation using JDBC and Oracle SQL to improve application performance',
      'Contributed to front-end support tasks using HTML, CSS, and JavaScript, including bug fixing and UI updates',
      'Participated in testing, debugging, and documentation activities across the full software development lifecycle',
      'Gained exposure to real-time project environments, team collaboration, and delivery-focused workflows',
    ],
    stack: ['Java', 'Oracle SQL', 'JDBC', 'HTML', 'CSS', 'JavaScript', 'SDLC'],
  },
]

const EDUCATION = {
  degree:  'Bachelor of Technology (B.Tech)',
  subject: 'Computer Science & Engineering',
  college: 'Konark Institute of Science and Technology',
  univ:    'Biju Patnaik University of Technology, Odisha',
  period:  '2021 – 2025',
  cgpa:    '7.83 / 10',
}

const CERTS = [
  'Software Engineer Intern Certification — Alumnus Software Limited (2025)',
  'Full Stack Java Developer Training — Naresh I Technologies (2025)',
  'Java (Core & Advanced) Certification — LIT, Bhubaneswar (2024)',
]

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper id="experience" eyebrow="07 / Experience" title="Where I've worked">
      <div ref={ref} className="max-w-3xl space-y-0">

        {/* ── Timeline entries ── */}
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-8 mb-1">
            <div className="timeline-line" />
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: .15 + idx * .15, type: 'spring', stiffness: 400 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: idx * .15, ease: [0.22,1,0.36,1] }}
              className="gc sp rounded-2xl p-6 mb-5"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(var(--neon)/.1)', border: '1px solid hsl(var(--neon)/.22)' }}>
                    <Briefcase size={16} style={{ color: 'hsl(var(--neon))' }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[.97rem] leading-tight"
                      style={{ color: 'hsl(var(--ink-1))' }}>
                      {exp.role}
                    </h3>
                    <p className="font-body text-[.84rem] font-medium mt-0.5"
                      style={{ color: 'hsl(var(--neon))' }}>
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono-j text-[.6rem] px-2.5 py-1 rounded-full"
                    style={{ background: 'hsl(var(--neon)/.1)', border: '1px solid hsl(var(--neon)/.22)', color: 'hsl(var(--neon))' }}>
                    {exp.type}
                  </span>
                  <span className="flex items-center gap-1 font-mono-j text-[.63rem]"
                    style={{ color: 'hsl(var(--ink-4))' }}>
                    <Calendar size={10} /> {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 font-mono-j text-[.63rem]"
                    style={{ color: 'hsl(var(--ink-4))' }}>
                    <MapPin size={10} /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-5">
                {exp.highlights.map((h, j) => (
                  <motion.div key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: .2 + idx * .15 + j * .05, duration: .4, ease: [0.22,1,0.36,1] }}
                    className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0"
                      style={{ background: 'hsl(var(--neon))', boxShadow: '0 0 5px hsl(var(--neon)/.5)' }} />
                    <p className="text-[.81rem] font-body leading-relaxed"
                      style={{ color: 'hsl(var(--ink-2))' }}>{h}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stack chips */}
              <div className="pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                <p className="font-mono-j text-[.57rem] uppercase tracking-[.16em] mb-2"
                  style={{ color: 'hsl(var(--ink-4))' }}>
                  Tech used
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map(t => (
                    <span key={t} className="chip chip-neon text-[.61rem]">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* ── Education card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6, delay: .4, ease: [0.22,1,0.36,1] }}
          className="gc sp rounded-2xl p-6 mb-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'hsl(var(--violet)/.1)', border: '1px solid hsl(var(--violet)/.22)' }}>
              <GraduationCap size={16} style={{ color: 'hsl(var(--violet))' }} />
            </div>
            <div>
              <h3 className="font-display font-bold text-[.97rem] leading-tight"
                style={{ color: 'hsl(var(--ink-1))' }}>
                {EDUCATION.degree}
              </h3>
              <p className="font-body text-[.84rem] font-medium mt-0.5"
                style={{ color: 'hsl(var(--violet))' }}>
                {EDUCATION.subject} · {EDUCATION.college}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-1.5 mb-4">
            {[
              { label: 'University',  val: EDUCATION.univ   },
              { label: 'Period',      val: EDUCATION.period  },
              { label: 'CGPA',        val: EDUCATION.cgpa    },
            ].map(({ label, val }) => (
              <div key={label}>
                <span className="font-mono-j text-[.57rem] uppercase tracking-[.14em]"
                  style={{ color: 'hsl(var(--ink-4))' }}>
                  {label}
                </span>
                <p className="font-body text-[.82rem] mt-0.5"
                  style={{ color: 'hsl(var(--ink-2))' }}>{val}</p>
              </div>
            ))}
          </div>
          {/* Certifications */}
          <div className="pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <p className="font-mono-j text-[.57rem] uppercase tracking-[.16em] mb-2"
              style={{ color: 'hsl(var(--ink-4))' }}>
              Certifications
            </p>
            <ul className="flex flex-col gap-1.5">
              {CERTS.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono-j text-[.62rem] flex-shrink-0 mt-[1px]"
                    style={{ color: 'hsl(var(--violet)/.5)' }}>·</span>
                  <p className="text-[.78rem] font-body leading-relaxed"
                    style={{ color: 'hsl(var(--ink-2))' }}>{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
