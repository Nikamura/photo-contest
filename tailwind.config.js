/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "media",
  daisyui: {
    themes: ["cupcake", "forest"],
    darkTheme: "forest",
  },
};
