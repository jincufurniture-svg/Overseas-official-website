/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          light: '#D4B996',
          DEFAULT: '#C19A6B',
          dark: '#A07E50', // darker variant derived from main
        },
        beige: {
          DEFAULT: '#F8F5F0',
          dark: '#E8E5E0',
        },
        grey: {
          dark: '#333333',
          DEFAULT: '#666666',
          light: '#999999',
        },
        black: {
          DEFAULT: '#111111',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'PingFang SC', 'sans-serif'],
        heading: ['Montserrat', 'Noto Sans SC', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1366px', // Customized max width as per request (1366px/1920px logic)
        },
      }
    },
  },
  plugins: [],
}
