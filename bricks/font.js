const addLoader = require('../utils/addLoader')
const merge = require('webpack-merge')
const depInstaller = require('../utils/depInstaller')
// https://www.npmjs.com/package/url-loader
const fontBrick = (type, options) => config => {
  depInstaller('url-loader', 'file-loader')

  const defaultOptions = {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `static/font/[name].[ext]?[hash:7]`
    }
  }

  const fontRule = merge(defaultOptions, options)
  return addLoader(fontRule)(config)
}

module.exports = fontBrick
