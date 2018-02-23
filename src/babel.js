const { merge, pipe } = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')
const deps = require('./deps')
/**
 * babel Brick
 */
module.exports = options =>
  function babel(conf) {
    deps(['happypack', 'babel-loader', 'babel-core'])
    const HappyPack = require('happypack')
    const threadPool = require('./_thread-pool')

    const defaultOptions = {
      cacheDirectory: true
    }
    const babelOptions = merge(options)(defaultOptions)

    return pipe(
      plugin(
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
      ),
      loader({
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: [/node_modules/]
      })
    )(conf)
  }
