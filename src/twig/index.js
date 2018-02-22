const loader = require('../loader')
const deps = require('../deps')

module.exports = (options = {}) =>
  deps(['twig-loader']).then(() => {
    const twigBrick = conf =>
      loader({
        test: /\.twig$/,
        loader: 'twig-loader',
        options
      })(conf)
    return twigBrick
  })
