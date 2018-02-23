const loader = require('../loader')
const deps = require('../deps')

module.exports = (options = {}) =>
  function twig(conf) {
    deps(['twig-loader'])
    return loader({
      test: /\.twig$/,
      loader: 'twig-loader',
      options
    })(conf)
  }
