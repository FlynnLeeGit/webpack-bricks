const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')


const happyVueBrick = options => config => {
  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')

  return pipe(
    addPlugin(
      new HappyPack({
        id: 'vue',
        threadPool,
        loaders: ['vue-loader']
      })
    ),
    addLoader({
      test: /\.vue$/,
      use: 'happypack/loader?id=vue'
    })
  )(config)
}

module.exports = happyVueBrick
