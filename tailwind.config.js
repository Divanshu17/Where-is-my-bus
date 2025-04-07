/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
      boxShadow: {
        glow: '0 0 15px rgba(var(--tw-shadow-color))',
      },
    },
  },
  plugins: [],
  safelist: [
    'from-red-500',
    'from-amber-500',
    'from-green-500',
    'via-red-600',
    'via-amber-600',
    'via-green-600',
    'to-red-500',
    'to-amber-500',
    'to-green-500',
  ],
}