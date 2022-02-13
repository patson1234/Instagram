module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  },
  plugins: [require("@tailwindcss/forms"),
  require('tailwind-scrollbar'),
  require('tailwind-scrollbar-hide')],
}