// import textScalePlugin from 'tailwindcss-text-scale'
import textScalePlugin from '../dist'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [
    textScalePlugin({
      maxScreen: 1024,
    })
  ],
}

