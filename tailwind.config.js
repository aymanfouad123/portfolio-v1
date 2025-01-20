/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // This tells Tailwind which files to scan
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'code-bg': '#1E1E1E',
        'code-yellow': '#DCDCAA',
        'code-blue': '#569CD6',
        'code-string': '#CE9178',
      }
    },
  },
  plugins: [],
}