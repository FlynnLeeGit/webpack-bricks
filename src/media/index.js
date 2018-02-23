const { merge } = require('config-brick')
const deps = require('../deps')
const loader = require('../loader')
// https://www.npmjs.com/package/url-loader
module.exports = options =>
  function media(conf) {
    deps(['url-loader', 'file-loader'])
    const defaultOptions = {
      limit: 10000,
      name: `static/media/[name].[ext]?[hash:7]`
    }
    return loader({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: merge(options)(defaultOptions)
    })(conf)
  }
