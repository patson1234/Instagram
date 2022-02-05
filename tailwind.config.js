module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"),
  require('tailwind-scrollbar'),
  require('tailwind-scrollbar-hide')],
}