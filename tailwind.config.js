/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(54,110,254)', // Your custom color here
        customGreen: '#10B981', // Another custom color
      },
      height: {
        custom: "450px",
      },
    },
  },
  plugins: [],
};
