const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')

const twigBrick = (options = {}) => (config, next) => {
  deps(['twig-loader']).then(() => {
    const new_conf = $wb(config)
      .loader({
        test: /\.twig$/,
        loader: 'twig-loader',
        options
      })
      .value()
    next(new_conf)
  })
}

module.exports = twigBrick
