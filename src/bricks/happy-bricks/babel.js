const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

const happyBabelBrick = options => (conf, next) => {
  deps(['happypack', 'babel-loader', 'babel-core']).then(() => {
    const HappyPack = require('happypack')
    const threadPool = require('./thread-pool')

    const defaultOptions = {
      cacheDirectory: true
    }

    const babelOptions = $wb(defaultOptions)
      .merge(options)
      .value()

    const new_conf = $wb(conf)
      .plugin(
        new HappyPack({
          id: 'babel',
          threadPool,
          loaders: [
            {
              loader: 'babel-loader',
              options: babelOptions
            }
          ]
        })
      )
      .loader({
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: [/node_modules/]
      })
      .value()
    next(new_conf)
  })
}

module.exports = happyBabelBrick
