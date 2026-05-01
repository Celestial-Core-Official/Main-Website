/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#030712',
        midnight: {
          DEFAULT: '#080d1a',
          50: '#1a2240',
          100: '#101828',
          500: '#080d1a',
          900: '#040810'
        },
        nebula: {
          blue: '#38bdf8',
          'blue-glow': '#7dd3fc',
          purple: '#c084fc',
          'purple-glow': '#d8b4fe',
          gold: '#fbbf24'
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        'glow-sm': '0 0 14px rgba(125, 211, 252, 0.3)',
        glow: '0 0 28px rgba(125, 211, 252, 0.4)',
        'glow-lg': '0 0 52px rgba(125, 211, 252, 0.5)',
        'glow-purple': '0 0 28px rgba(192, 132, 252, 0.4)',
        'glow-gold': '0 0 28px rgba(251, 191, 36, 0.4)'
      },
      backgroundImage: {
        'mesh-aurora':
          'radial-gradient(60% 40% at 20% 10%, rgba(56,189,248,0.2), transparent 60%), radial-gradient(50% 40% at 85% 20%, rgba(192,132,252,0.18), transparent 60%), radial-gradient(55% 45% at 50% 90%, rgba(251,191,36,0.07), transparent 60%)',
        'conic-ring':
          'conic-gradient(from 120deg, #38bdf8, #c084fc, #fbbf24, #38bdf8)'
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-4%, 3%, 0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'nebula-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -2%) scale(1.03)' },
          '66%': { transform: 'translate(-2%, 3%) scale(0.98)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 3.6s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'nebula-drift': 'nebula-drift 25s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite'
      }
    }
  },
  plugins: []
}
