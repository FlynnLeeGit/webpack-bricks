const addLoader = require('../utils/addLoader')
const merge = require('webpack-merge')

// https://www.npmjs.com/package/url-loader
const imageBrick = (type, options) => config => {
  require('url-loader')
  require('file-loader')

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
