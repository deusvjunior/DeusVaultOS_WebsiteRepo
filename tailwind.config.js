/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Orbitron', 'monospace'],
        'subtitle': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'caption': ['Space Grotesk', 'sans-serif'],
        'display': ['Orbitron', 'monospace']
      },
      colors: {
        // STRICT CYAN & YELLOW ONLY COLOR SYSTEM
        'cyber': {
          'black': '#0a0a0a',
          'white': '#ffffff',
          'cyan': '#00FFFF',      // Electric cyan only
          'yellow': '#FFFF00',    // Bright yellow only
          'dark': {
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#adb5bd',
            400: '#6c757d',
            500: '#495057',
            600: '#343a40',
            700: '#212529',
            800: '#1a1d20',
            900: '#131619',
          }
        },
        // Brand Colors - CYAN & YELLOW ONLY
        'brand': {
          'primary': '#00FFFF',   // Electric cyan
          'secondary': '#FFFF00', // Bright yellow
          'accent': '#00FFFF',    // Electric cyan
          'neutral': {
            50: '#f8fafc',
            100: '#f1f5f9', 
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        // Accent colors
        'accent': {
          'cyan': '#00e1ff',
          'green': '#39ff14',
          'yellow': '#ffd700',
          'purple': '#bf00ff',
          'pink': '#ff006e',
          'orange': '#ff8500'
        }
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'holographic': 'holographic 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          'from': { filter: 'drop-shadow(0 0 20px #00e1ff)' },
          'to': { filter: 'drop-shadow(0 0 30px #39ff14)' }
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        matrix: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '20px 20px' }
        },
        holographic: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'cyber': '0 0 30px rgba(0, 225, 255, 0.3)',
        'neon': '0 0 20px currentColor',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': `
          linear-gradient(rgba(0, 225, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 225, 255, 0.1) 1px, transparent 1px)
        `
      },
      backgroundSize: {
        'grid': '50px 50px'
      }
    },
  },
  plugins: [],
}
