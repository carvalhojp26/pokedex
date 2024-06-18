/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#373737',
        'components': '#D6D6D6'
      },
      width: {
        "custom": '500px',
        "display-w": '550px',
        "height": '350px'
      },
    },
  },
  plugins: [],
}
