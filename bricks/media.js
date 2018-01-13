const addLoader = require('../utils/addLoader')
const merge = require('webpack-merge')

// https://www.npmjs.com/package/url-loader
const mediaBrick = (type, options) => config => {
  require('url-loader')
  require('file-loader')

  const defaultOptions = {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `static/media/[name].[ext]?[hash:7]`
    }
  }

  const mediaRule = merge(defaultOptions, options)
  return addLoader(mediaRule)(config)
}

module.exports = mediaBrick
