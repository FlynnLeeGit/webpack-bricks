const $wb = require('../../webpack-bricks')

const aliasBrick = options => config => {
  return $wb(config)
    .merge({
      resolve: {
        alias: $wb()
          .merge(options)
          .value()
      }
    })
    .value()
}

module.exports = aliasBrick
