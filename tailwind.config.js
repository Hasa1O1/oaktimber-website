/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // OAKTIMBER brand palette from the visual guidelines.
      colors: {
        primary: {
          50: '#eefbf4',
          100: '#d7f4e5',
          200: '#afe9cc',
          300: '#78d8a9',
          400: '#35bb77',
          500: '#009444',
          600: '#007a38',
          700: '#00632f',
          800: '#004d40',
          900: '#00382f',
        },
        wood: {
          light: '#B5834C',
          medium: '#7a4b1f',
          dark: '#603913',
        },
        accent: {
          cream: '#fbfaf7',
          beige: '#efe4d6',
          brown: '#603913',
          orange: '#F7921E',
          teal: '#004D40',
          gray: '#B5834C',
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

