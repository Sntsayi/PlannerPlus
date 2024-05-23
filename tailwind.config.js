/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      iranSans: ["IRANSans UltraLight"],
    },
    extend: {
      colors: {
        "gray-SecondaryColor": "#7A7B7C",
        "orange-Secondary": "#ff9f43",
        "black-bg": "#1C1C1C",

        black_Secondary: "rgb(31,41,55)",
        black_Secondary3: "rgb(70,60,60)",
        black_Secondary2: "rgb(10,60,70)",
        "blue-Secondary": "#359BF9",
      },
      spacing: {
        90: "22rem",
        "30%": "30%",
        "28%": "28%",
        "65%": "65%",
        "93%": "93%",
        "400%": "400%",
        70: "17rem",
        36.5: "9.5rem",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
