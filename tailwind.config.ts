/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '384px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#0D1117',
        secondary: '#161B22',
        tertiari: '#E3E8EF',
        quaternary: '#0F1319',
        error: '#de2916',
        red: '#D63864',
        'petroleum-blue': '#336699',
        'gris-chaud': '#505A67',
        'light-blue': '#7eb5ec',
        'soft-gray': '#B0BEC5',
        'olive-green': '#8A9A5B',
        'golden-yellow': '#FFD700',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

