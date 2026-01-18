/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar modo oscuro con clase
  theme: {
    extend: {
      colors: {
        // Colores tranquilos para modo claro
        calm: {
          50: '#f0f9f4',
          100: '#dcf3e6',
          200: '#bce5d0',
          300: '#8fcfb3',
          400: '#5bb093',
          500: '#3a9377',
          600: '#2a7661',
          700: '#245f4f',
          800: '#204d42',
          900: '#1d4037',
        },
        // Colores suaves azul-verde para modo oscuro
        peaceful: {
          50: '#f0f9fa',
          100: '#ccf1f5',
          200: '#99e3ea',
          300: '#66d5df',
          400: '#33c7d4',
          500: '#00b9c9',
          600: '#0094a1',
          700: '#006f79',
          800: '#004a51',
          900: '#002529',
        },
        // Tonos tierra suaves
        earth: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe1d1',
          300: '#dccab0',
          400: '#c9af8a',
          500: '#b8966a',
          600: '#a68054',
          700: '#896a47',
          800: '#70583d',
          900: '#5d4834',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
