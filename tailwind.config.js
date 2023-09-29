/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppin': ['Poppins', 'sans-serif']
      },
      fontWeight: {
        'custom-light': 100
      }
    },
  },
  plugins: [],
}

