/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
      colors: {
        'brand-primary': '#316B77',
        'brand-dark': '#324B50',
        'brand-light': '#95B0B6',
        'brand-contrast-dark': '#18353b',
        'brand-contrast-light': '#A090B1'
      }

    },
  },
  plugins: [],
}