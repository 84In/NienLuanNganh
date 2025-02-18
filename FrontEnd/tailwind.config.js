/** @type {import('tailwindcss').Config} */
/**
Grid responsive
xs = extra-small: 0px
sm = small: 600px
md = medium: 900px
lg = large: 1200px
xl = extra-large: 1536px
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "third-color": "var(--third-color)",
        "error-color": "var(--error-color)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        "grid-xs": "0px",
        "grid-sm": "600px",
        "grid-md": "900px",
        "grid-lg": "1200px",
        "grid-xl": "1536px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
