// import textScalePlugin from 'tailwindcss-text-scale'
import textScalePlugin from '../dist'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    textScalePlugin()
  ],
}

