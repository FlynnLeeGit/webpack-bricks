const { merge } = require('config-brick')

const devtoolBrick = options => conf => {
  return merge({
    devtool: options
  })(conf)
}

module.exports = devtoolBrick
