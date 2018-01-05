const HappyPack = require('happypack')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const threadPool = require('./thread-pool')

const happyBabelBrick = options => config => {
  const config1 = addPlugin(
    config,
    new HappyPack({
      id: 'babel',
      threadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  )

  const config2 = addLoader(config1, {
    test: /\.js$/,
    use: 'happypack/loader?id=babel',
    exclude: [/node_modules/]
  })

  return config2
}

module.exports = happyBabelBrick
