/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    boxShadow: ({ theme }) => ({
      DEFAULT: `2px 2px 0 0 ${theme("colors.black")}`,
    }),
    extend: {
      typography: {
        xl: {
          css: {
            a: {
              textDecoration: "none",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
