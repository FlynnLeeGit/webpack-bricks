const addLoader = require('../../utils/addLoader')
const merge = require('webpack-merge')
const depInstaller = require('../../utils/depInstaller')

// https://www.npmjs.com/package/url-loader
const mediaBrick = (options = {}) => config => {
  depInstaller('url-loader', 'file-loader')

  const defaultOptions = {
    limit: 10000,
    name: `static/media/[name].[ext]?[hash:7]`
  }

  let mediaRule = {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: merge(defaultOptions, options)
  }

  return addLoader(mediaRule)(config)
}

module.exports = mediaBrick
