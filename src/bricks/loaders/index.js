const $wb = require('../../core')

const loaders = opts => conf => {
  return $wb(conf)
    .merge({
      module: {
        rules: [...opts]
      }
    })
    .value()
}

module.exports = loaders
