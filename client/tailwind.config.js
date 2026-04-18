/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf7ef',
          100: '#f9e8d2',
          200: '#f1cd9d',
          300: '#e6ac6a',
          400: '#d98c3f',
          500: '#c46f24',
          600: '#a3571c',
          700: '#7e4218',
          800: '#5a2f14',
          900: '#3a1f0e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
