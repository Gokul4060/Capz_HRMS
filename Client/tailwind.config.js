/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        customGreen: "#8ded88",
        customplam: "#27be3e",
        darkgreen: "#1fa533",
      },
    },
  
  },
  plugins: [],
};
