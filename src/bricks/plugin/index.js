const $wb = require('../../core')

const pluginBrick = (...opts) => conf => {
  return $wb(conf)
    .merge({
      plugins: [...opts]
    })
    .value()
}

module.exports = pluginBrick
