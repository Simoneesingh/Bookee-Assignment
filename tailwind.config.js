/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        White: "#F7F8FB",
        WhiteSmoke: "#F1F4F8",

        Blue50: "#CBD2E1",
        Blue100: "#A4B8D3",
        Blue500: "#4F6C92",
        Blue: "#004FB4",

        Pink100: "#EED2DF",
        Pink500: "#FE93B3",
        Pink: "#E2006A",
        
        Green100: "#CAEFD8",
        Green500: "#55CB82",
        Green: "#16A64D",
      }
    },
  },
  plugins: [],
}