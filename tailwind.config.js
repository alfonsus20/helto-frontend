const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          100: "#F4FCD9",
          300: "#C5D8A4",
        },
        brown: {
          100: "#FFFBE9",
          200: "#E3CAA5",
          300: "#CEAB93",
          350: "#BB9981",
          400: "#AD8B74",
          500: "#7A6353",
          550: "#6a5648",
          600: "#544441",
          700: "#7F2736",
        },
        gray: {
          DEFAULT: "#696984",
        },
        pink: {
          300: "#CEAB93",
        },
      },
    },
    screens: {
      xs: "480px",
      ...screens,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
