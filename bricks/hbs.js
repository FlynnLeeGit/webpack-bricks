const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')

// https://www.npmjs.com/package/handlebars-loader

const handlebarsBrick = (options = {}) => config => {
  depInstaller('handlebars-loader', 'handlebars')

  const defaultOptions = {
    test: /\.hbs/,
    loader: 'handlebars-loader',
    options: {}
  }
  const hbsRule = Object.assign({}, defaultOptions, options)
  return addLoader(hbsRule)(config)
}

module.exports = handlebarsBrick
