module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgColor: '#FFFFFF',
        borderColor: '#e6e6e6',
        blueColor: '#2463EB',
      },
      spacing: {
        '10%': '10%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
