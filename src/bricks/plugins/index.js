const $wb = require('../../core')

const plugins = opts => conf => {
  return $wb(conf)
    .merge({
      plugins: [...opts]
    })
    .value()
}

module.exports = plugins
