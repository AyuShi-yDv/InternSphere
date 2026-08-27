/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { brand: '#4B5BEF', navy: '#17233F' },
    boxShadow: { soft: '0 18px 60px rgba(23,35,63,.10)' }
  }},
  plugins: []
}
