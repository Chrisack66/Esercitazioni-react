/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tailgrids/tailwind/**/*.js", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailgrids/tailwind"),
  ],
}