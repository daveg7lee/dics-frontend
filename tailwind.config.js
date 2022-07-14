module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgColor: "#FFFFFF",
        borderColor: "#e6e6e6",
        blueColor: "#2463EB",
        gradientPurple: "#7F7FD5",
        gradientBlue: "#86A8E7",
        gradientGreen: "#91EAE4",
      },
      spacing: {
        "10%": "10%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
