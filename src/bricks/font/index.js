const $ = require('../../webpack-bricks')
const deps = require('../../utils/deps')

// https://www.npmjs.com/package/url-loader
const fontBrick = (options = {}) => conf =>
  deps(['url-loader', 'file-loader']).then(() => {
    const defaultOptions = {
      limit: 10000,
      name: `static/font/[name].[ext]?[hash:7]`
    }
    return $.loader({
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: $.merge(options)(defaultOptions)
    })(conf)
  })

module.exports = fontBrick
