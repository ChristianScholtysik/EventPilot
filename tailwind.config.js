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
        grey: "var(--color-gray)",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        semibold: 500,
        bold: 700,
        normal: 100,
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom,#668BE9 ,#44ABD4)",
      },
    },
  },
  plugins: [],
};
