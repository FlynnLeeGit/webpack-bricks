const addLoader = require('../utils/addLoader')

// https://www.npmjs.com/package/vue-loader

const vueBrick = options => config => {
  require('vue-loader')

  const defaultOptions = {
    test: /\.vue$/,
    loader: 'vue-loader',
    option: {}
  }
  const vueRule = Object.assign({}, defaultOptions, options)
  return addLoader(vueRule)(config)
}

module.exports = vueBrick
