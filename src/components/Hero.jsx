import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

/* ── Real contact info ───────────────────────────────────────────── */
const SOCIALS = [
  {
    icon: Github,
    href: 'https://github.com/swagatkumarsahoo',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/swagat-kumar-sahoo',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:swagatksahoo.dev@gmail.com',
    label: 'Email',
  },
];

/* ── Recruiter-grade stats ───────────────────────────────────────── */
const STATS = [
  {
    value: 'Internship',
    label: 'Real industry exposure',
    pos: { top: '10%', left: '-52px' },
  },
  {
    value: 'REST APIs',
    label: 'Backend systems built',
    pos: { top: '46%', right: '-52px' },
  },
  {
    value: 'Immediate',
    label: 'Joining availability',
    pos: { bottom: '12%', left: '-40px' },
  },
];

function useParticles(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W;
    let H;
    let frame;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.1 + 0.3,
      a: Math.random() * 0.25 + 0.06,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,150,${p.a * 0.2})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [ref]);
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1],
  },
});

export default function Hero() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  useParticles(canvasRef);

  return (
    <section id="hero" className="relative min-h-screen">
      {/* Background */}
      <div className="aurora-orb aurora-1" />
      <div className="aurora-orb aurora-2" />
      <div className="aurora-orb aurora-3" />
      <div className="hero-grid" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.45 }}
      />

      {/* Main Layout */}
      <div
        className="
          relative z-10
          max-w-6xl mx-auto
          px-6 lg:px-10
          min-h-screen
          flex flex-col lg:flex-row
          items-center justify-center
          gap-12 lg:gap-20
          pt-24 pb-20
        "
      >
        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status Pill */}
          <motion.div
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono-j text-[.68rem] mb-7"
            style={{
              border: '1px solid hsl(var(--neon)/.3)',
              background: 'hsl(var(--neon)/.06)',
              color: 'hsl(var(--neon))',
            }}
          >
            <span className="status-dot" />
            Available for Immediate Joining · Java Backend / Full Stack Roles
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display font-extrabold mb-3 leading-[1.03]"
            style={{
              fontSize: 'clamp(2.9rem,7vw,5.4rem)',
              letterSpacing: '-.033em',
            }}
          >
            <span className="text-gradient">Swagat Kumar</span>
            <br />
            <span style={{ color: 'hsl(var(--ink-1))' }}>Sahoo</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            {...fadeUp(0.18)}
            className="font-display font-semibold mb-4"
            style={{
              fontSize: 'clamp(.95rem,2.2vw,1.15rem)',
              color: 'hsl(var(--ink-3))',
              letterSpacing: '-.01em',
            }}
          >
            Java Backend / Full Stack Engineer
            <span style={{ margin: '0 .5rem', color: 'hsl(var(--ink-4))' }}>
              ·
            </span>
            Spring Boot
            <span style={{ margin: '0 .5rem', color: 'hsl(var(--ink-4))' }}>
              ·
            </span>
            REST APIs
            <span style={{ margin: '0 .5rem', color: 'hsl(var(--ink-4))' }}>
              ·
            </span>
            React
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            {...fadeUp(0.25)}
            className="max-w-[560px] text-[.95rem] leading-relaxed"
            style={{
              color: 'hsl(var(--ink-3))',
              margin: '0 auto 1.2rem',
            }}
          >
            I engineer scalable backend systems using Java, Spring Boot, and
            React—focused on clean architecture, secure REST APIs, database
            reliability, and production-ready full-stack applications. I bring
            internship experience, real project delivery, and strong hands-on
            development discipline from day one.
          </motion.p>

          {/* Credibility Line */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono-j text-[.68rem] mb-7"
            style={{
              color: 'hsl(var(--ink-4))',
            }}
          >
            Interned at Alumnus Software Limited · Advanced Full Stack Java
            Training at Naresh i Technologies
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.35)}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              <Download size={14} />
              Download Resume
            </a>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            {...fadeUp(0.42)}
            className="flex gap-2.5 justify-center lg:justify-start mb-7"
          >
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="soc-btn"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>

          {/* Now Building */}
          <motion.button
            type="button"
            {...fadeUp(0.48)}
            className="now-badge"
            onClick={() =>
              document
                .getElementById('currently-building')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <span className="now-dot" />

            <span
              className="font-mono-j text-[.63rem]"
              style={{ color: 'hsl(var(--gold))' }}
            >
              Now building:
            </span>

            <span
              className="font-mono-j text-[.63rem]"
              style={{ color: 'hsl(var(--ink-3))' }}
            >
              Production-style Inventory & Order Management Platform · Spring
              Boot + React
            </span>

            <ArrowRight size={11} style={{ color: 'hsl(var(--gold))' }} />
          </motion.button>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.85,
            delay: 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex-shrink-0 w-[270px] lg:w-[310px]"
        >
          <div className="photo-ring" />

          <div
            ref={cardRef}
            className="hero-photo-card"
            style={{ aspectRatio: '3/4' }}
          >
            <img
              src="/swagat1.jpg"
              alt="Swagat Kumar Sahoo"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />

            <div className="photo-placeholder" style={{ display: 'none' }}>
              SKS
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-5"
              style={{
                background:
                  'linear-gradient(to top, hsl(var(--bg)/.85), transparent)',
              }}
            >
              <p
                className="font-display font-bold text-[.88rem]"
                style={{ color: 'hsl(var(--ink-1))' }}
              >
                Swagat Kumar Sahoo
              </p>

              <p
                className="font-mono-j text-[.62rem]"
                style={{ color: 'hsl(var(--neon))' }}
              >
                Java Backend / Full Stack Engineer
              </p>
            </div>
          </div>

          {/* Floating Stats */}
          {STATS.map(({ value, label, pos }, index) => (
            <div
              key={index}
              className="stat-pill"
              style={{
                ...pos,
                animationDelay: `${index * -1.4}s`,
              }}
            >
              <span
                className="font-display font-bold text-[.78rem]"
                style={{ color: 'hsl(var(--neon))' }}
              >
                {value}
              </span>

              <span
                style={{
                  color: 'hsl(var(--ink-3))',
                  fontSize: '.59rem',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-hint">
        <span className="scroll-hint-label">scroll</span>

        <div className="scroll-chevrons">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
