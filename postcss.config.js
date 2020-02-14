module.exports = {
  plugins: [
    require('cssnano'),
    require('autoprefixer')({
      grid: true,
      flexbox: true,
      cascade: true,
    }),
  ],
};
