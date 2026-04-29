import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'currently-building', label: 'Now' },
  { id: 'how-i-build', label: 'Systems' },
  { id: 'projects', label: 'Projects' },
  { id: 'why-hire-me', label: 'Why Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') !== 'light';
    } catch (e) {
      return true;
    }
  });

  // Scroll + active section detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let cur = '';
      for (const { id } of [...LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          cur = id;
          break;
        }
      }
      if (window.scrollY < 80) cur = '';
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme toggle — persist to localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.remove('light');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {}
    } else {
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {}
    }
  }, [dark]);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            {/* Logo Badge */}
            <div
              className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, hsl(var(--neon)), hsl(var(--violet)))',
                boxShadow: '0 0 18px hsl(var(--neon)/0.35)',
              }}
            >
              <span className="text-[0.7rem] font-bold text-white tracking-tight">
                SKS
              </span>

              {/* subtle glow pulse */}
              <span
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition"
                style={{
                  boxShadow: '0 0 25px hsl(var(--neon)/0.6)',
                }}
              />
            </div>

            {/* Text */}
            <span
              className="font-display font-semibold text-[0.9rem] tracking-tight"
              style={{ color: 'hsl(var(--ink-1))' }}
            >
              Swagat<span style={{ color: 'hsl(var(--neon))' }}>.dev</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                className={`nav-link ${active === link.id ? 'active' : ''}`}
                onClick={() => go(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid hidden lg:inline-flex"
              style={{
                padding: '.4rem 1rem',
                fontSize: '.76rem',
                borderRadius: '999px',
              }}
            >
              Resume ↗
            </a>

            {/* Hamburger */}
            <button
              type="button"
              className="theme-toggle lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-50 rounded-2xl p-5"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(28px)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 24px 60px hsl(var(--bg)/.6)',
            }}
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  type="button"
                  className={`nav-link text-left text-[.9rem] py-2.5 ${active === link.id ? 'active' : ''}`}
                  onClick={() => go(link.id)}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid mt-2 justify-center"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
