const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

const vueBrick = opt => (conf, next) => {
  deps([
    'vue-loader',
    'vue-template-compiler',
    'css-loader',
    'style-loader'
  ]).then(() => {
    const new_conf = $wb(conf)
      .loader({
        test: /\.vue$/,
        loader: 'vue-loader',
        options: $wb()
          .merge(opt)
          .value()
      })
      .value()

    next(new_conf)
  })
}

module.exports = vueBrick
