/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#2957A4',
      'lg-blue': '#94BDF2',
      'yellow': '#F5D20F',
      'green': '#76C04E',
      'white': '#ffffff',

      gray: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
      },
      purple: {
        400: "#9F67FF",
        500: "#7C3AED",
      },
      white: "#ffffff",
      red: "#ED3A5A",
    },
    backgroundImage: {
      "img-enchente": "url('/src/assets/Background_Login.png')",
    },
    extend: {},
  },
  plugins: [],
}

