const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')

const happyBabelBrick = options => config => {
  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')
  const merge = require('webpack-merge')

  require('babel-loader')
  const defaultOptions = {
    cacheDirectory: true
  }
  const babelOptions = merge(defaultOptions, options)

  return pipe(
    addPlugin(
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
    addLoader({
      test: /\.js$/,
      use: 'happypack/loader?id=babel',
      exclude: [/node_modules/]
    })
  )(config)
}

module.exports = happyBabelBrick
