const addLoader = require('../utils/addLoader')
const merge = require('webpack-merge')
const depInstaller = require('../utils/depInstaller')

// https://www.npmjs.com/package/url-loader
const imageBrick = (type, options) => config => {
  depInstaller('url-loader', 'file-loader')

  const defaultOptions = {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `static/image/[name].[ext]?[hash:7]`
    }
  }

  const imageRule = merge(defaultOptions, options)
  return addLoader(imageRule)(config)
}

module.exports = imageBrick
