import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:        'var(--forest)',
        'forest-2':    'var(--forest-2)',
        'forest-3':    'var(--forest-3)',
        'forest-soft': 'var(--forest-soft)',
        gold:          'var(--gold)',
        'gold-2':      'var(--gold-2)',
        'gold-3':      'var(--gold-3)',
        'gold-soft':   'var(--gold-soft)',
        clay:          'var(--clay)',
        'clay-2':      'var(--clay-2)',
        slate:         'var(--slate)',
        umber:         'var(--umber)',
        paper:         'var(--paper)',
        'paper-2':     'var(--paper-2)',
        'paper-3':     'var(--paper-3)',
        vellum:        'var(--vellum)',
        ink:           'var(--ink)',
        'ink-2':       'var(--ink-2)',
        'ink-3':       'var(--ink-3)',
        'ink-4':       'var(--ink-4)',
        rule:          'var(--rule)',
        accent:        'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        arabic:  ['var(--font-arabic)'],
        mono:    ['var(--font-mono)'],
      },
      maxWidth: {
        content: 'var(--content-max)',
        wide:    'var(--content-wide)',
        prose:   'var(--content-prose)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm:  'var(--shadow-sm)',
        md:  'var(--shadow-md)',
        lg:  'var(--shadow-lg)',
        xl:  'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
}

export default config
