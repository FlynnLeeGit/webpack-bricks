const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

const happyVueBrick = options => (config, next) => {
  deps([
    'happypack',
    'vue-loader',
    'vue-template-compiler',
    'css-loader',
    'style-loader'
  ]).then(() => {
    const HappyPack = require('happypack')
    const threadPool = require('./thread-pool')

    const new_conf = $wb(config)
      .plugin(
        new HappyPack({
          id: 'vue',
          threadPool,
          loaders: [
            {
              loader: 'vue-loader',
              options
            }
          ]
        })
      )
      .loader({
        test: /\.vue$/,
        use: 'happypack/loader?id=vue'
      })
      .value()
    next(new_conf)
  })
}
module.exports = happyVueBrick
