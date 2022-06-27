/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,svelte}"],
  theme: {
    fontFamily: {
      sans: ["Atkinson Hyperlegible", "sans-serif"],
    },
    borderRadius: {
      sm: "0.3125rem",
      md: "0.625rem",
      lg: "1.25rem",
      round: "50%",
      full: "100vw",
    },
    fontSize: {
      14: "3.5rem",
      12: "3rem",
      11: "2.75rem",
      8: "2rem",
      6.125: "1.625rem",
      6: "1.5rem",
      5: "1.25rem",
      4.125: "1.125rem",
      4: "1rem",
      sm: "0.9375rem",
      xs: "0.875rem",
      xxs: "0.8125re,",
    },
    colors: {
      white: "hsl(0,0%,100%)",
      gray: {
        900: "hsl(0,0%,95%)",
        1000: "hsl(0,0%,95%)",
      },
      yellow: {
        800: "hsl(37, 98%, 54%)",
        900: "hsl(37, 100%, 65%)",
      },
      blue: {
        100: "hsl(206, 45%, 15%)",
        200: "hsl(205, 30%, 27%)",
        400: "hsl(203, 22%, 55%)",
        500: "hsl(205, 37%, 55%)",
        800: "hsl(205, 28%, 79%)",
        900: "hsl(203, 25%, 90%)",
      },
    },
    extend: {},
  },
  plugins: [],
};