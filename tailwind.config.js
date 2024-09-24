/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        tBase: "var(--color-text-base)",
        date: "var(--color-date)",
        location: "var(--color-location)",
        gray: "var(--color-gray)",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        semibold: 500,
        bold: 700,
        normal: 100,
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom,#668BE9 ,#44ABD4)",
      },
    },
  },
  plugins: [],
};
