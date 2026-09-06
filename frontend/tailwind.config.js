/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e1f2e4',
          200: '#c5e5cc',
          300: '#99d1a5',
          400: '#66b677',
          500: '#3f9a52',
          600: '#2e7d3e',
          700: '#266333',
          800: '#1b4725',
          900: '#153a1f',
          950: '#0a2010',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4ede4',
          200: '#e8dbca',
          300: '#d9c2a7',
          400: '#c5a381',
          500: '#b48a63',
          600: '#9f734f',
          700: '#7f593e',
          800: '#674936',
          900: '#543c2e',
        },
        charcoal: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0b0f17',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
