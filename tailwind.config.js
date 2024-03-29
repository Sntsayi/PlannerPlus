/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "gray-SecondaryColor": "#7A7B7C",
        "orange-Secondary": "#F97C35",
        "black-Secondary": "#222325",
      },
      spacing: {
        "30%": "30%",
        "28%": "28%",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
