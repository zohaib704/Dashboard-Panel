/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1E",
        secondary: "#BA5EEF",
        light: "#9e9e9e",
        dark: "#1c1a15",
      },
    },
  },
  plugins: [],
});
