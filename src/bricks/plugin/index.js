const $b = require('config-brick')

const pluginBrick = (...opts) => conf => {
  return $b(conf)
    .merge({
      plugins: [...opts]
    })
    .value()
}

module.exports = pluginBrick
