const HappyPack = require('happypack')
const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const threadPool = require('./thread-pool')

const happyBabelBrick = options => config =>
  pipe(
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

module.exports = happyBabelBrick
