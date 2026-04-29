import { Github, Linkedin, Mail } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer
      className="section-outer"
      style={{
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="section-inner flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg,hsl(var(--p)),hsl(var(--p2)))',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span
            className="font-display font-bold text-[.85rem]"
            style={{ color: 'hsl(var(--ink-1))' }}
          >
            SKS<span style={{ color: 'hsl(var(--p))' }}>.</span>dev
          </span>
        </div>

        <p className="text-[.72rem]" style={{ color: 'hsl(var(--ink-4))' }}>
          Built with [CODE + COFFEE] · {new Date().getFullYear()}
        </p>

        <div className="flex gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="soc-btn"
              style={{ width: 32, height: 32 }}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
