/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      soot: "#343b39",
      spruce: "#4c5553",
      clear: "#e1eae8",
      cold: "#f0fdfa",
      silver: "#bfd8ce",
      wood: "#c49d88",
      hellion: "#88c4ad",
      white: "#fff",
    },
    extend: {},
  },
  plugins: [],
};
