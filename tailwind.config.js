/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        midnight: {
          DEFAULT: '#0A0F1F',
          50: '#1C2340',
          100: '#141A33',
          500: '#0A0F1F',
          900: '#05080F'
        },
        nebula: {
          blue: '#3B82F6',
          'blue-glow': '#60A5FA',
          purple: '#8B5CF6',
          'purple-glow': '#A78BFA',
          gold: '#F5C451'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(96, 165, 250, 0.35)',
        glow: '0 0 24px rgba(96, 165, 250, 0.45)',
        'glow-lg': '0 0 48px rgba(96, 165, 250, 0.55)',
        'glow-purple': '0 0 24px rgba(139, 92, 246, 0.45)',
        'glow-gold': '0 0 24px rgba(245, 196, 81, 0.45)'
      },
      backgroundImage: {
        'mesh-aurora':
          'radial-gradient(60% 40% at 20% 10%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(50% 40% at 85% 20%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(55% 45% at 50% 90%, rgba(245,196,81,0.08), transparent 60%)',
        'conic-ring':
          'conic-gradient(from 120deg, #3B82F6, #8B5CF6, #F5C451, #3B82F6)'
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
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 3.6s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  },
  plugins: []
}
