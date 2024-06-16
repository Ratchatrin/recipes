/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
<<<<<<< HEAD
=======
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
>>>>>>> 30ca14346d1338a7405e92291aeadd557d3661de
};
