import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── Light mode
        parchment:       '#F5F1EC',
        'parchment-dim': '#EDE8E0',

        // ── Dark mode surfaces
        charcoal:        '#1A1917',
        'charcoal-lift': '#252220',
        'charcoal-card': '#2D2A28',

        // ── Ink (text)
        ink:             '#1C1917',
        'ink-muted':     '#5C5650',
        'ink-faint':     '#A39D98',

        // ── Ink (dark mode)
        'ink-snow':      '#EDE8E2',
        'ink-snow-muted':'#A39D98',
        'ink-snow-faint':'#6E6862',

        // ── Accent — muted sage green (soothing, growth, editorial)
        sage:            '#4A7C5F',
        'sage-hover':    '#3D6A4F',
        'sage-light':    '#EBF3EE',
        'sage-glow':     '#7FB38A',  // lighter for dark mode

        // ── Warm card surface
        surface:         '#FFFFFF',
        'surface-dark':  '#242120',

        // ── Borders
        'rim':           '#E0D9D0',
        'rim-dark':      '#38332F',
        'rim-strong':    '#C8BFB4',
      },
      fontSize: {
        'display':    ['clamp(2.8rem,5.5vw,4.5rem)',  { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem,4vw,3rem)',         { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'headline':   ['clamp(1.4rem,2.5vw,1.875rem)',{ lineHeight: '1.2',  letterSpacing: '-0.018em' }],
      },
      maxWidth: {
        editorial: '72rem',
        prose:     '68ch',
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 30px -6px rgb(0 0 0 / 0.12), 0 4px 10px -4px rgb(0 0 0 / 0.08)',
        'card-dark': '0 1px 3px 0 rgb(0 0 0 / 0.4)',
        'card-hover-dark': '0 10px 30px -6px rgb(0 0 0 / 0.5)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
