import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}", // Combine this with the above content
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        "theme-blue": "#00AEFF",
        "theme-border": "#3F454B",
        "theme-grey": "#1B1F23",
        "theme-light-blue": "#C3E5FF",
        hue: {
          // Shades of Hue
          700: "#52555D", // dark grey
          500: "#A0A3AC", // medium grey
          300: "#B9C0D3", // medium blue grey
          200: "#CACCD0", // light grey
          100: "#F4F4F4", // lighter grey
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

export default withUt(config);
