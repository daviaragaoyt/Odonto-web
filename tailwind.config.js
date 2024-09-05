/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lilitaOne: ["LilitaOne"],
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.25)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
      },
      textStrokeWidth: {
        DEFAULT: '1px',
        sm: '0.5px',
        lg: '2px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          "text-shadow": "1px 1px 2px rgba(0, 0, 0, 0.25)",
        },
        ".text-shadow": {
          "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-lg": {
          "text-shadow": "3px 3px 6px rgba(0, 0, 0, 0.5)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },

  ],
};
