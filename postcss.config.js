module.exports = {
  plugins: [
    require(`stylelint`),
    require(`postcss-reporter`)({clearReportedMessages: true}),
    require(`postcss-will-change`),
    require(`postcss-import`),
    require(`postcss-cssnext`),
  ]
};
