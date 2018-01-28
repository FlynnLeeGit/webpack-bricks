const merge = require('webpack-merge')
const addLoader = require('../../utils/addLoader')
const depInstaller = require('../../utils/depInstaller')
// https://www.npmjs.com/package/url-loader
const fontBrick = (options = {}) => config => {
  depInstaller('url-loader', 'file-loader')

  const defaultOptions = {
    limit: 10000,
    name: `static/font/[name].[ext]?[hash:7]`
  }
  const fontRule = {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: merge(defaultOptions, options)
  }

  return addLoader(fontRule)(config)
}

module.exports = fontBrick
