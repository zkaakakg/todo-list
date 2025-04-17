// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // app directory 쓰면 이거 꼭!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
