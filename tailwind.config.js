/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primaryColor: "#FFFFFF",
      secondaryColor: "#2485B0",
      titleColor: "#000",
      textColor: "#1F2223",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Montserrat", "serif"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: "light",
  },
};
