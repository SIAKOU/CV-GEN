/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Force RGB colors for PDF compatibility
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
  },
  // Force RGB color space instead of oklch
  corePlugins: {
    // Ensure compatibility with html2canvas
  },
}
