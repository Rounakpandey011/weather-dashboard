/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        sky: {
          950: '#040d1a',
          900: '#071428',
          850: '#0a1f3d',
          800: '#0d2b52',
        },
        frost: {
          DEFAULT: '#7dd3fc',
          dim: '#38bdf8',
        },
        aurora: {
          purple: '#a78bfa',
          teal: '#2dd4bf',
          orange: '#fb923c',
        },
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(135deg, #040d1a 0%, #071428 50%, #0a1f3d 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'card-highlight': 'linear-gradient(135deg, rgba(125,211,252,0.15) 0%, rgba(167,139,250,0.05) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite linear',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 20px rgba(125,211,252,0.2)',
      },
    },
  },
  plugins: [],
}
