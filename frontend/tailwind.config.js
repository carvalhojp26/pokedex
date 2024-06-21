/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'number': '#A09F9F',
        'pokemonBg': '#F8E9FF',
        'inputBg': '#F3F2F2',
        'myPurple': '#946BA7'
      },
      width: {
        input: '500px',
        pokemonInfoBg: '450px'
      },
    },
  },
  plugins: [],
}
