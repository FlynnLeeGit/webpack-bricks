const merge = require('webpack-merge')
const addLoader = require('../../utils/addLoader')
const depInstaller = require('../../utils/depInstaller')

// https://www.npmjs.com/package/handlebars-loader

const handlebarsBrick = (options = {}) => config => {
  depInstaller('handlebars-loader', 'handlebars')
  const defaultOptions = {}
  const hbsRule = {
    test: /\.hbs/,
    loader: 'handlebars-loader',
    options: merge(defaultOptions, options)
  }
  return addLoader(hbsRule)(config)
}

module.exports = handlebarsBrick
