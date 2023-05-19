/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      lg: { max: "1199.99px" },
      md: { max: "1039.99px" },
      sm: { max: "767.99px" },
      xs: { max: "424.99px" },
    },
    extend: {},
  },
  plugins: [],
};
