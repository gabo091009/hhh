/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        primary: '#A855F7',
        secondary: '#0BF2FF',
        tertiary: '#0DFF88',
        neutral: '#7C7488',
        'bg-dark': '#03050a',
      },
      animation: {
        'strobe': 'strobe 2s infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'progress': 'progress 1s ease-in-out infinite',
      },
      keyframes: {
        strobe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '80%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
}