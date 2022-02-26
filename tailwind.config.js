module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bi: {
          600: '#2b2b2b',
          700: '#232323',
          800: '#1e1e1e',
          900: '#171717',
        },
      },
      fontFamily: {
        bioRhyme: '"BioRhyme" ,"Noto Sans Arabic"',
      },
    },
  },
  plugins: [],
}
