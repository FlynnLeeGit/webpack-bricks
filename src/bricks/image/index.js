const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

// https://www.npmjs.com/package/url-loader
const imageBrick = options => (config, next) => {
  const defaultOptions = {
    limit: 10000,
    name: `static/image/[name].[ext]?[hash:7]`
  }

  deps(['url-loader', 'file-loader']).then(() => {
    const new_conf = $wb(config)
      .loader({
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: $wb(defaultOptions)
          .merge(options)
          .value()
      })
      .value()
    next(new_conf)
  })
}

module.exports = imageBrick
