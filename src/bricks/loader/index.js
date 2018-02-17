const $b = require('config-brick')

const loaderBrick = (...opts) => conf => {
  return $b(conf)
    .merge({
      module: {
        rules: [...opts]
      }
    })
    .value()
}

module.exports = loaderBrick