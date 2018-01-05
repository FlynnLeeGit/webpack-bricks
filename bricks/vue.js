const addLoader = require('../utils/addLoader')

// https://www.npmjs.com/package/vue-loader

const vueBrick = options => config => {
  const defaultOptions = {
    test: /\.vue/,
    loader: 'vue-loader'
  }
  const vueRule = Object.assign({}, defaultOptions, options)
  return addLoader(config, vueRule)
}

module.exports = vueBrick
