/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          0: '#080810',
          1: '#0d0d1a',
          2: '#111120',
          3: '#16162a',
          border: 'rgba(255,255,255,0.07)',
        },
        accent: {
          purple: '#7c3aed',
          violet: '#8b5cf6',
          blue:   '#3b82f6',
          cyan:   '#06b6d4',
          green:  '#10b981',
        },
        ink: {
          primary:   '#f1f0ff',
          secondary: '#a1a1bc',
          muted:     '#6b6b85',
          faint:     '#3a3a55',
        },
      },
      screens: { xs: '480px' },
    },
  },
  plugins: [],
}
