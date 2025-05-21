/** @type {import('tailwindcss').Config} */

const { preProcessFile } = require('typescript');

module.exports = {
  plugins: [require('tailwindcss-primeui')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
  }
  },
  corePlugins: {
    preflight: false,
  },
};
