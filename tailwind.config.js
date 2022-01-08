module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'gotham': [ 'Gotham', 'sans-serif']
      },
      colors: {
        red: {
          primary: '#EB3F36',
          text: '#730C07'
        }
      }
    },
  },
  plugins: [],
}
