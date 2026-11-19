/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#F9F6F0',
        charcoal: '#231F20',
        saffron: '#C86D1F',
        sand: '#E7D6B8',
        olive: '#B8A67D',
        botanical: '#66735A',
        turmeric: '#F2C56B',
        forest: '#171B17',
        moss: '#262B22',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
