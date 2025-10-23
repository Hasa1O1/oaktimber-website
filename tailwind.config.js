/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Custom color palette inspired by wood and natural tones
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dcc5',
          300: '#d4bc92',
          400: '#c19a5f',
          500: '#a87c3f',
          600: '#8b6534',
          700: '#6e4e2a',
          800: '#523a1f',
          900: '#362615',
        },
        wood: {
          light: '#e8dcc5',
          medium: '#c19a5f',
          dark: '#6e4e2a',
        },
        accent: {
          cream: '#faf8f5',
          beige: '#e8dcc5',
          brown: '#8b6534',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

