/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // This tells Tailwind which files to scan
  ],
  theme: {
    extend: {
      fontFamily: {
        courier: ["'Courier New'", 'monospace'],
        mono: ["'JetBrains Mono'", 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        xl: '20px',
      },
      colors: {
        'code-bg': '#1E1E1E',
        'code-yellow': '#DCDCAA',
        'code-blue': '#569CD6',
        'code-string': '#CE9178',
        'card-bg': '#232323',
      }
    },
  },
  plugins: [],
}