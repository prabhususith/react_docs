/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        angular: {
          50: '#fff1f1',
          100: '#ffdfdf',
          500: '#dd0031',
          600: '#c3002f',
          900: '#7a0019',
        },
        react: {
          50: '#e8f7ff',
          100: '#d0efff',
          500: '#61dafb',
          600: '#38bdf8',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
