/** @type {import('tailwindcss').Config} */

/**
 * The palette is taken from the institution's crest: deep navy and gold on
 * cream. `brand` is the navy scale (brand-700 is the crest navy exactly),
 * `gold` is the accent, `cream` the warm neutral. Teal and clay are kept for
 * semantics only — teal marks something free or complete, clay marks an error.
 */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f6fb',
          100: '#e4ebf5',
          200: '#c7d6ea',
          300: '#9db4d3',
          400: '#6c8cb6',
          500: '#446a9b',
          600: '#2a4d7d',
          700: '#14284b', // crest navy
          800: '#101f3a',
          900: '#0b172c',
        },
        gold: {
          50: '#fdf9ef',
          100: '#f9f0d9',
          200: '#f2e0b0',
          300: '#e9cd88',
          400: '#e2c476', // crest gold, light
          500: '#c9a34a', // crest gold
          600: '#ab8636',
          700: '#876728',
        },
        cream: {
          50: '#fdfcf9',
          100: '#f8f6f0', // crest cream
          200: '#efeade',
          300: '#e2d9c5',
        },
        teal: {
          400: '#3aada0',
          500: '#178d80',
          600: '#0d6f65',
        },
        clay: {
          400: '#d8735c',
          500: '#c2543f',
          600: '#a33f2c',
        },
        ink: {
          DEFAULT: '#111d33',
          soft: '#42506b',
          muted: '#6d7b94',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        dari: ['var(--font-dari)', 'Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        card: '0 18px 50px -22px rgba(20, 40, 75, 0.28)',
        lift: '0 30px 70px -30px rgba(20, 40, 75, 0.42)',
        soft: '0 8px 28px -12px rgba(20, 40, 75, 0.18)',
        gold: '0 14px 30px -12px rgba(201, 163, 74, 0.55)',
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
