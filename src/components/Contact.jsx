import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// ─── Replace YOUR_FORM_ID with your Formspree form ID ───────────────────────
// 1. Go to https://formspree.io → New Form → copy the 8-char ID
// 2. Replace "YOUR_FORM_ID" below with that ID, e.g. "xpzgkwqr"
// ────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = 'xjgjrnwn';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'swagatksahoo.dev@gmail.com',
    href: 'mailto:swagatksahoo.dev@gmail.com',
    color: 'hsl(var(--neon))',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/swagatkumarsahoo',
    href: 'https://github.com/swagatkumarsahoo',
    color: 'hsl(var(--violet))',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/swagat-kumar-sahoo',
    href: 'https://linkedin.com/in/swagat-kumar-sahoo',
    color: 'hsl(var(--cyan))',
  },
];

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = 'Name is required';
  if (!form.email.trim()) errs.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'Enter a valid email';
  if (!form.message.trim()) errs.message = 'Message is required';
  return errs;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [touched, setTouched] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    // Guard: if Formspree ID has not been configured, skip network call
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      setErrorMsg(
        'Contact form not yet configured. Please email swagatksahoo.dev@gmail.com directly.'
      );
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTouched({});
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data?.error || 'Something went wrong. Please email me directly.'
        );
        setStatus('error');
      }
    } catch {
      setErrorMsg(
        'Network error. Please email swagatksahoo.dev@gmail.com directly.'
      );
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-xl px-4 py-3 text-[.88rem] font-body outline-none transition-all duration-200';

  const inputStyle = (field) => ({
    background: 'hsl(var(--bg-2))',
    border: `1px solid ${
      touched[field] && errors[field]
        ? 'hsl(350 90% 60% / .6)'
        : 'var(--glass-border)'
    }`,
    color: 'hsl(var(--ink-1))',
    boxShadow:
      touched[field] && !errors[field] && form[field]
        ? '0 0 0 2px hsl(var(--neon) / .15)'
        : 'none',
  });

  return (
    <SectionWrapper
      id="contact"
      eyebrow="08 / Contact"
      title={
        <>
          Let's <span className="text-gradient">talk</span>
        </>
      }
    >
      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[.95rem] font-body leading-relaxed mb-10 max-w-lg"
          style={{ color: 'hsl(var(--ink-2))' }}
        >
          If you're hiring Java or full-stack engineers — or just want to talk
          about a project — reach out. I respond the same day.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8">
          {/* ── Contact links ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-4"
              style={{ color: 'hsl(var(--ink-4))' }}
            >
              Find me on
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {LINKS.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gc sp rounded-xl px-4 py-3.5 flex items-center gap-3.5 no-underline group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${color.slice(0, -1)} / .12)`,
                      border: `1px solid ${color.slice(0, -1)} / .22)`,
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display font-semibold text-[.86rem]"
                      style={{ color: 'hsl(var(--ink-1))' }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-mono-j text-[.66rem] mt-0.5 truncate"
                      style={{ color: 'hsl(var(--ink-4))' }}
                    >
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'hsl(var(--ink-4))' }}
                  />
                </a>
              ))}
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid w-full justify-center"
            >
              <ArrowUpRight size={14} />
              Download Resume (PDF)
            </a>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="font-mono-j text-[.6rem] uppercase tracking-[.18em] mb-4"
              style={{ color: 'hsl(var(--ink-4))' }}
            >
              Send a message
            </p>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="gc rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
              >
                <CheckCircle2 size={40} style={{ color: 'hsl(var(--neon))' }} />
                <p
                  className="font-display font-bold text-[1rem]"
                  style={{ color: 'hsl(var(--ink-1))' }}
                >
                  Message sent!
                </p>
                <p
                  className="text-[.84rem] font-body"
                  style={{ color: 'hsl(var(--ink-3))' }}
                >
                  Thanks for reaching out. I'll reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="gc rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-mono-j text-[.62rem] uppercase tracking-[.14em] mb-1.5 flex items-center gap-1.5"
                    style={{ color: 'hsl(var(--ink-3))' }}
                  >
                    <User size={11} />
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    className={inputBase}
                    style={inputStyle('name')}
                    autoComplete="name"
                    disabled={status === 'sending'}
                  />
                  {touched.name && errors.name && (
                    <p
                      className="font-mono-j text-[.62rem] mt-1"
                      style={{ color: 'hsl(350 90% 60%)' }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-mono-j text-[.62rem] uppercase tracking-[.14em] mb-1.5 flex items-center gap-1.5"
                    style={{ color: 'hsl(var(--ink-3))' }}
                  >
                    <Mail size={11} />
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@email.com"
                    className={inputBase}
                    style={inputStyle('email')}
                    autoComplete="email"
                    disabled={status === 'sending'}
                  />
                  {touched.email && errors.email && (
                    <p
                      className="font-mono-j text-[.62rem] mt-1"
                      style={{ color: 'hsl(350 90% 60%)' }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-mono-j text-[.62rem] uppercase tracking-[.14em] mb-1.5 flex items-center gap-1.5"
                    style={{ color: 'hsl(var(--ink-3))' }}
                  >
                    <MessageSquare size={11} />
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about the role, project, or whatever's on your mind…"
                    rows={4}
                    className={`${inputBase} resize-none`}
                    style={inputStyle('message')}
                    disabled={status === 'sending'}
                  />
                  {touched.message && errors.message && (
                    <p
                      className="font-mono-j text-[.62rem] mt-1"
                      style={{ color: 'hsl(350 90% 60%)' }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Network/server error */}
                {status === 'error' && errorMsg && (
                  <div
                    className="flex items-start gap-2 rounded-lg px-3.5 py-3"
                    style={{
                      background: 'hsl(350 90% 60% / .08)',
                      border: '1px solid hsl(350 90% 60% / .25)',
                    }}
                  >
                    <AlertCircle
                      size={14}
                      className="flex-shrink-0 mt-[1px]"
                      style={{ color: 'hsl(350 90% 60%)' }}
                    />
                    <p
                      className="text-[.78rem] font-body"
                      style={{ color: 'hsl(350 90% 60%)' }}
                    >
                      {errorMsg}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-solid justify-center mt-1"
                  style={{
                    opacity: status === 'sending' ? 0.7 : 1,
                    cursor: status === 'sending' ? 'not-allowed' : 'none',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span
                        className="inline-block w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: 'white',
                          borderTopColor: 'transparent',
                        }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>

                <p
                  className="text-center font-mono-j text-[.6rem]"
                  style={{ color: 'hsl(var(--ink-4))' }}
                >
                  Or email directly:{' '}
                  <a
                    href="mailto:swagatksahoo.dev@gmail.com"
                    className="underline"
                    style={{ color: 'hsl(var(--neon))' }}
                  >
                    swagatksahoo.dev@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
