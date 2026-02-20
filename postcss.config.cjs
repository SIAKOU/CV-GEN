module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Force RGB color space for PDF compatibility
      base: './tailwind.config.js',
    },
    autoprefixer: {},
  },
}
