/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-black': '#191414',
        'spotify-dark': '#121212',
        'spotify-grey': '#B3B3B3',
        'spotify-light-grey': '#282828'
      }
    }
  },
  plugins: [],
}
