const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

// https://www.npmjs.com/package/url-loader
const fontBrick = options => (config, next) => {
  const defaultOptions = {
    limit: 10000,
    name: `static/media/[name].[ext]?[hash:7]`
  }
  deps(['url-loader', 'file-loader']).then(() => {
    const new_conf = $wb(config)
      .loader({
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: $wb(defaultOptions)
          .merge(options)
          .value()
      })
      .value()
    next(new_conf)
  })
}

module.exports = fontBrick
