/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(215,225,236)",
        p: "rgb(127,127,127)",
        c: "rgb(12, 14, 15)",
      },
      fontFamily: {
        sora: '"Sora", serif',
        row: '"Rowdies", sans-serif',
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
