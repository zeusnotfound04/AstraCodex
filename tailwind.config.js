/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'glow-move': 'glow-move 8s ease-in-out infinite',
        'glow-expand': 'glow-expand 6s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.15' },
        },
        'fade-in-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'glow-move': {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'translate(-50%, -50%) scale(1)'
          },
          '50%': { 
            opacity: '0.2',
            transform: 'translate(-50%, -50%) scale(1.1)'
          },
        },
        'glow-expand': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'translate(-50%, -50%) scale(0.9)'
          },
          '50%': { 
            opacity: '0.15',
            transform: 'translate(-50%, -50%) scale(1.2)'
          },
        },
      },
      colors: {
        purple: {
          400: '#a855f7',
          500: '#9333ea',
          600: '#7e22ce'
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'gold': '0 0 50px 10px rgba(245, 158, 11, 0.3)',
        'purple': '0 0 50px 15px rgba(147, 51, 234, 0.25)' 
      },
      dropShadow: {
        'purple': '0 0 35px rgba(147, 51, 234, 0.4)'
      }
    },
  },
  plugins: [],
};