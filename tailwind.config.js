/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C5F2E",
        secondary: "#2D2D2D",
        accent: "#C9A84C",
        background: "#F7F4EF",
        darkBrown: "rgba(26, 26, 26, 0.08)",
      },
    },
  },
  plugins: [],
};
