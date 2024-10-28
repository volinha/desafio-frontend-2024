/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        normal: "url('/assets/normal.jpg')",
        fire: "url('/assets/fire.jpg')",
        water: "url('/assets/water.jpg')",
        electric: "url('/assets/electric.jpg')",
        grass: "url('/assets/grass.jpg')",
        ice: "url('/assets/ice.jpg')",
        pokemon: "url('/assets/poke_bg.png')",
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
      },
      dropShadow: {
        'pixel': [
          '1px 1px 0 rgba(96, 96, 96, 1)',
          '1px 1px 0 rgba(96, 96, 96, 1)',
          '1px -1px 0 rgba(96, 96, 96, 1)',
          '-1px 1px 0 rgba(96, 96, 96, 1)'
        ],
      },
      boxShadow: {
        'menus': '4px 4px 0 0 rgba(0,0,0,0.5)'
      },
      animation: {
        roll: "roll 2s linear infinite",
      },
      keyframes: {
        roll: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(10deg)",
          },
          "50%": {
            transform: "",
          },
          "75%": {
            transform: "rotate(-10deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      borderWidth: {
        'pixel': '4px',
      },
      borderStyles: {
        'pixel': 'solid',
      },
    },
  },
  plugins: [],
};
