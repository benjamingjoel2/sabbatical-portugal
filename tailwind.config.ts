import type { Config } from 'tailwindcss';

/**
 * Porto Season design tokens. Tailwind v3 is used deliberately: it compiles to plain CSS
 * without cascade layers, so the site renders in older browsers and in-app web views.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        harbor: { DEFAULT: '#14263B', deep: '#0C1826' },
        azulejo: { DEFAULT: '#2F5E9A', mist: '#C6D3DF' },
        terracotta: '#C2643A',
        port: '#6B1E2C',
        limestone: '#E7E0D2',
        shell: '#F8F5EE',
        line: 'rgba(20, 38, 59, 0.12)',
      },
      borderColor: { DEFAULT: 'currentColor' },
      fontFamily: {
        display: ['var(--font-hanken)', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['var(--font-gilda)', '"Times New Roman"', 'serif'],
        sans: ['var(--font-hanken)', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.2' }],
        'display-xl': ['clamp(2.75rem, 1.6rem + 4.6vw, 5rem)', { lineHeight: '0.9' }],
        'display-l': ['clamp(2.25rem, 1.4rem + 3.4vw, 4.25rem)', { lineHeight: '0.95' }],
        'display-m': ['clamp(1.75rem, 1.2rem + 2vw, 2.75rem)', { lineHeight: '1' }],
        statement: ['clamp(1.5rem, 1.05rem + 1.6vw, 2.5rem)', { lineHeight: '1.12' }],
        mega: ['clamp(3rem, 1.2rem + 6.4vw, 6rem)', { lineHeight: '0.92' }],
      },
      transitionTimingFunction: { harbor: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      screens: { xs: '30rem' },
    },
  },
  plugins: [],
};

export default config;
