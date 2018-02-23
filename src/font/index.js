const { merge } = require('config-brick')
const deps = require('../deps')
const loader = require('../loader')
/**
 * font brick function
 * @param {object} options
 * @return {Function}
 * @see https://www.npmjs.com/package/url-loader
 */
module.exports = options =>
  function font(conf) {
    deps(['url-loader', 'file-loader'])
    const defaultOptions = {
      limit: 10000,
      name: `static/font/[name].[ext]?[hash:7]`
    }
    return loader({
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: merge(options)(defaultOptions)
    })(conf)
  }
