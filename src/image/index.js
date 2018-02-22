const { merge } = require('config-brick')
const deps = require('../deps')
const loader = require('../loader')
// https://www.npmjs.com/package/url-loader
module.exports = options =>
  deps(['url-loader', 'file-loader']).then(() => {
    const defaultOptions = {
      limit: 10000,
      name: `static/image/[name].[ext]?[hash:7]`
    }
    const imageBrick = conf =>
      loader({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: merge(options)(defaultOptions)
      })(conf)
    return imageBrick
  })
