const HappyPack = require('happypack')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const threadPool = require('./thread-pool')

const happyVueBrick = options => config => {
  const config1 = addPlugin(
    config,
    new HappyPack({
      id: 'vue',
      threadPool,
      loaders: ['vue-loader']
    })
  )

  const config2 = addLoader(config1, {
    test: /\.vue$/,
    use: 'happypack/loader?id=vue'
  })

  return config2
}

module.exports = happyVueBrick
