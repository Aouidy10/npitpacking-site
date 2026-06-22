import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nauma: {
          50:  "#eef1f9",
          100: "#d6ddf0",
          200: "#adbae1",
          300: "#8498d2",
          400: "#5b75c3",
          500: "#3253b4",
          600: "#1B3266", // navy principal
          700: "#152854",
          800: "#0f1e3f",
          900: "#0a142a",
          teal: "#3DAAB5",
          "teal-50":  "#e8f6f8",
          "teal-100": "#c5e8ec",
          gold: "#C8A46E",
          "gold-50": "#fdf5e9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
