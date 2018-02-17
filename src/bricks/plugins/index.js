const $b = require('config-brick')

const plugins = opts => conf => {
  return $b(conf)
    .merge({
      plugins: [...opts]
    })
    .value()
}

module.exports = plugins
