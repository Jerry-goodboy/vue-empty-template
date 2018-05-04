module.exports = {
  plugins: {
    // Disable `postcss-url`
    'postcss-url': false,

    'autoprefixer': {browsers: 'last 5 version'},

    // Customize `postcss-cssnext` default options
    'postcss-cssnext': {
      features: {
        customProperties: false
      }
    }

    // Add some plugins
    // 'postcss-nested': {},
    // 'postcss-responsive-type': {},
    // 'postcss-hexrgba': {}
  }
}