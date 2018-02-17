const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

// https://www.npmjs.com/package/url-loader
const fontBrick = (options = {}) => (config, next) => {
  const defaultOptions = {
    limit: 10000,
    name: `static/font/[name].[ext]?[hash:7]`
  }

  deps(['url-loader', 'file-loader']).then(() => {
    next(
      $wb(config)
        .loader({
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: $wb(defaultOptions)
            .merge(options)
            .value()
        })
        .value()
    )
  })
}

module.exports = fontBrick
