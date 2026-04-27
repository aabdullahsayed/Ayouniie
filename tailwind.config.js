/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0e0402",
        secondary: "#77583a",
        background: "#fbf9f7",
        surface: "#fbf9f7",
        "primary-container": "#2b1b17",
        "on-surface": "#1b1c1b",
      },
      fontFamily: {
        serif: ["Noto Serif"],
        sans: ["Manrope"],
      },
    },
  },
  plugins: [],
};