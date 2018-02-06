const $wb = require('../../core')

const loaderBrick = (...opts) => conf => {
  return $wb(conf)
    .merge({
      module: {
        rules: [...opts]
      }
    })
    .value()
}

module.exports = loaderBrick