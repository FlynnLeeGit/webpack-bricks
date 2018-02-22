const { merge } = require('config-brick')
const deps = require('../deps')
const loader = require('../loader')
// https://www.npmjs.com/package/url-loader
module.exports = options =>
  deps(['url-loader', 'file-loader']).then(() => {
    const defaultOptions = {
      limit: 10000,
      name: `static/font/[name].[ext]?[hash:7]`
    }
    const fontBrick = conf =>
      loader({
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: merge(options)(defaultOptions)
      })(conf)
    return fontBrick
  })
