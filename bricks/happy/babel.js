const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')

const happyBabelBrick = options => config => {
  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')
  return pipe(
    addPlugin(
      new HappyPack({
        id: 'babel',
        threadPool,
        loaders: ['babel-loader?cacheDirectory']
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
