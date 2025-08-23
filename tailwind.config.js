/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Roboto', 'sans-serif']
      },

      gridTemplateColumns:{
        '70/30': '70% 20%' 
      }
    },
  },
  plugins: [],
}