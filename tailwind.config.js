import twAnimate from 'tw-animate-css';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [twAnimate],
  }
  