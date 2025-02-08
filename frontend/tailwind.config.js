/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7D0600',
        primaryText: '#333333',
        secondary: '#F3BE12',
        accent: '#FFF9F9',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      screens: {
        custom: '900px',
      },
    },
  },
  plugins: [],
}
