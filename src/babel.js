const { merge, pipe } = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')
const deps = require('./deps')
/**
 * babel Brick
 */
module.exports = options =>
  function babel(conf) {
    deps(['babel-loader', 'babel-core'])

    const defaultOptions = {
      cacheDirectory: true
    }
    const babelOptions = merge(options)(defaultOptions)

    return loader({
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: babelOptions
    })(conf)
  }
