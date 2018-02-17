const $wb = require('../../webpack-bricks')

const devtoolBrick = options => conf => {
  return $wb(conf)
    .merge({
      devtool: options
    })
    .value()
}

module.exports = devtoolBrick
