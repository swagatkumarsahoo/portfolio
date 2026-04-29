import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

// ── Real contact info from resume ──────────────────────────────────────────
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
  { icon: Mail, href: 'mailto:swagatksahoo.dev@gmail.com', label: 'Email' },
];

// Stats sourced honestly from the resume
const STATS = [
  {
    value: 'B.Tech',
    label: 'CS & Engineering',
    pos: { top: '10%', left: '-52px' },
  },
  {
    value: '100+',
    label: 'Coding challenges',
    pos: { top: '46%', right: '-52px' },
  },
  {
    value: '2+',
    label: 'Java certifications',
    pos: { bottom: '12%', left: '-40px' },
  },
];

function useParticles(ref) {
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, frame;
    const resize = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    const pts = Array.from({ length: 24 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.1 + 0.3,
      a: Math.random() * 0.25 + 0.06,
    }));
    pts.forEach((p) => {
      p.x = Math.random() * window.innerWidth;
      p.y = Math.random() * window.innerHeight;
    });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
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

const f = (d) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  useParticles(canvasRef);

  return (
    <section id="hero" className="relative min-h-screen">
      {/* Backgrounds */}
      <div className="aurora-orb aurora-1" />
      <div className="aurora-orb aurora-2" />
      <div className="aurora-orb aurora-3" />
      <div className="hero-grid" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.45 }}
      />

      {/* Two-column layout */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 min-h-screen
                      flex flex-col lg:flex-row items-center justify-center
                      gap-12 lg:gap-20 pt-24 pb-20"
      >
        {/* ── LEFT: text ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status pill */}
          <motion.div
            {...f(0.04)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono-j text-[.68rem] mb-7"
            style={{
              border: '1px solid hsl(var(--neon)/.3)',
              background: 'hsl(var(--neon)/.06)',
              color: 'hsl(var(--neon))',
            }}
          >
            <span className="status-dot" />
            Open to work · Full-time Java / Full Stack roles
          </motion.div>

          {/* Name */}
          <motion.h1
            {...f(0.1)}
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
            {...f(0.18)}
            className="font-display font-semibold mb-4"
            style={{
              fontSize: 'clamp(.9rem,2.2vw,1.15rem)',
              color: 'hsl(var(--ink-3))',
              letterSpacing: '-.01em',
            }}
          >
            Full Stack Java Developer
            <span style={{ color: 'hsl(var(--ink-4))', margin: '0 .5rem' }}>
              ·
            </span>
            Spring Boot
            <span style={{ color: 'hsl(var(--ink-4))', margin: '0 .5rem' }}>
              ·
            </span>
            React
          </motion.p>

          {/* Value prop */}
          <motion.p
            {...f(0.25)}
            className="max-w-[460px] text-[.95rem] leading-relaxed"
            style={{ color: 'hsl(var(--ink-3))', margin: '0 auto 2rem' }}
          >
            I build full-stack applications using Java Spring Boot and React,
            focusing on clean architecture, secure REST APIs, and scalable
            systems.
          </motion.p>

          {/* CTAs — stable hover, no mousemove transforms */}
          <motion.div
            {...f(0.33)}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              <Download size={14} /> Download Resume
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
              View Projects <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            {...f(0.4)}
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

          {/* Now building badge */}
          <motion.button
            type="button"
            {...f(0.47)}
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
              Smart Inventory & Order Management System · FullStack
            </span>
            <ArrowRight size={11} style={{ color: 'hsl(var(--gold))' }} />
          </motion.button>
        </div>

        {/* ── RIGHT: Photo card — static, no 3D tilt to prevent jitter ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0 w-[270px] lg:w-[310px]"
        >
          {/* Spinning ring */}
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
                const fb = e.target.nextSibling;
                if (fb) fb.style.display = 'flex';
              }}
            />
            <div className="photo-placeholder" style={{ display: 'none' }}>
              SKS
            </div>

            {/* Name overlay */}
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
                Full Stack Java Developer
              </p>
            </div>
          </div>

          {/* Floating stat pills */}
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              className="stat-pill"
              style={{ ...STATS[i].pos, animationDelay: `${i * -1.4}s` }}
            >
              <span
                className="font-display font-bold text-[.78rem]"
                style={{ color: 'hsl(var(--neon))' }}
              >
                {value}
              </span>
              <span style={{ color: 'hsl(var(--ink-3))', fontSize: '.59rem' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
