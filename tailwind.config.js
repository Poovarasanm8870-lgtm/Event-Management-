/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(226, 232, 240, 0.8)',
          violet: '#7C3AED',
          indigo: '#4F46E5',
          cyan: '#0891B2',
          emerald: '#059669',
          gold: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 10px 30px -5px rgba(124, 58, 237, 0.25)',
        'glow-cyan': '0 10px 30px -5px rgba(8, 145, 178, 0.25)',
        'glass': '0 8px 30px 0 rgba(0, 0, 0, 0.04)',
        'apple': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
