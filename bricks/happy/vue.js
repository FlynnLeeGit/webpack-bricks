const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const depInstaller  = require('../../utils/depInstaller')

const happyVueBrick = options => config => {
  depInstaller(
    'happypack',
    'vue-loader'
  ) 
  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')
  const merge = require('webpack-merge')

  const defaultOptions = {}
  const vueOptions = merge(defaultOptions, options)

  return pipe(
    addPlugin(
      new HappyPack({
        id: 'vue',
        threadPool,
        loaders: [
          {
            loader: 'vue-loader',
            options: vueOptions
          }
        ]
      })
    ),
    addLoader({
      test: /\.vue$/,
      use: 'happypack/loader?id=vue'
    })
  )(config)
}

module.exports = happyVueBrick
