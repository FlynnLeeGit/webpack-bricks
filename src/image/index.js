const { merge } = require('config-brick')
const deps = require('../deps')
const loader = require('../loader')
// https://www.npmjs.com/package/url-loader
module.exports = options =>
  function image(conf) {
    deps(['url-loader', 'file-loader'])
    const defaultOptions = {
      limit: 10000,
      name: `static/image/[name].[ext]?[hash:7]`
    }
    return loader({
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: merge(options)(defaultOptions)
    })(conf)
  }
