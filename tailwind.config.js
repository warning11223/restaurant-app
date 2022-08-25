/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f3f3f3",
        cardOverlay: "rgba(256, 256, 256, 0.4)",
        rowBg: "rgba(255, 131, 0, 0.06)",
        cardFilter: "rgba(256, 256, 256, 0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
      height: {
        225: "225px",
        400: "400px",
        600: "600px",
        700: "700px",
        800: "800px"

      },
      width: {
        190: "190px",
        225: "225px",
        300: "300px",
        350: "350px"

      }

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}