module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
      minWidth: {
        prose: '65ch',
      },
    },
    screens: {
      xs: '520px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
