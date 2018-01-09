const addLoader = require('../utils/addLoader')

// https://www.npmjs.com/package/vue-loader

const vueBrick = options => config => {
  
  require('handlebars-loader')
  require('handlebars')

  const defaultOptions = {
    test: /\.hbs/,
    loader: 'handlebars-loader'
  }
  const hbsRule = Object.assign({}, defaultOptions, options)
  return addLoader(hbsRule)(config)
}

module.exports = vueBrick
