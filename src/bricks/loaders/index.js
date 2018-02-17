const $b = require('config-brick')

const loaders = opts => conf => {
  return $b(conf)
    .merge({
      module: {
        rules: [...opts]
      }
    })
    .value()
}

module.exports = loaders
