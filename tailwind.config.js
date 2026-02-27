/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg:       '#f7f5f0',
        bg2:      '#edeae2',
        bg3:      '#e4e0d6',
        surface:  '#ffffff',
        ink:      '#111009',
        ink2:     '#3d3b34',
        muted:    '#8a8578',
        accent:   '#2d7a45',
        accentlt: '#4caf70',
        accent2:  '#e05c2a',
      },
    },
  },
  plugins: [],
}
