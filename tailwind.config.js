/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        accent: {
          orange: "#ff7849",
          amber: "#ffbf00",
          red: "#ff4b5c",
        },
      },
    },
  },
  plugins: [],
};
