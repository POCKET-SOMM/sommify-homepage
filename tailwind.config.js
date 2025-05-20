/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d11174',
        background: '#fcfcfe',
        black: '#1c1d1e',
        text: '#34355c',
      },
      fontFamily: {
        'mona': ['Mona Sans', 'sans-serif'],
        'hubot': ['Hubot Sans', 'monospace'],
      },
    },
  },
  plugins: [],
}