const { merge } = require('config-brick')

module.exports = (options = 'source-map') => {
  const devtoolBrick = conf =>
    merge({
      devtool: options
    })(conf)
  return devtoolBrick
}
