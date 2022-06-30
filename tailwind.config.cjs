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
      10: "2.5rem",
      8: "2rem",
      6.125: "1.625rem",
      6: "1.5rem",
      5: "1.25rem",
      4.125: "1.125rem",
      4: "1rem",
      sm: "0.9375rem",
      xs: "0.875rem",
      xxs: "0.8125rem",

      token: ["var(--token-fs, 3.5rem)", 1],
    },
    colors: {
      transparent: "transparent",
      white: "hsl(0,0%,100%)",
      black: "hsl(0,0%,0%)",
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
    extend: {
      width: {
        "token-icon": "var(--token-icon-size, 50%)",
      },
      maxWidth: {
        container: "69.375rem",
      },
      screens: {
        md: "40em",
        lg: "69em",
      },
    },
  },
  plugins: [],
};
