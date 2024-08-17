import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "quicksand": ["Quicksand", "sans-serif"],
        "comic": ["Comic Sans MS", "sans-serif"],
      }
    },
  },
  plugins: [],
}

