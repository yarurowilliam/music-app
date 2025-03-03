/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1ED760',
        'background-base': '#121212',
        'background-highlight': '#1A1A1A',
        'background-press': '#000',
        'background-elevated-base': '#242424',
        'background-elevated-highlight': '#2A2A2A',
      },
      gridTemplateColumns: {
        'cards': 'repeat(auto-fill, minmax(180px, 1fr))',
      },
      spacing: {
        'nav': '240px',
        'header': '64px',
        'player': '90px'
      }
    },
  },
  plugins: [],
}
