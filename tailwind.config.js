module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Mukta'],
        mono: ['"Fira Code"', 'ui-monospace'],
        display: ['Oswald'],
        body: ['"Open Sans"'],
      },
      colors: {
        white: '#ffffff',
        dark: '#1B2430',
      },
    },
  },
  plugins: [],
};
