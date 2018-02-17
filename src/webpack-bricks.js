const ConfigBrick = require('config-brick')

const WebpackBricks = ConfigBrick.extend()

WebpackBricks.bricks = Object.assign(ConfigBrick.bricks, {
  plugin: require('./bricks/plugin'),
  plugins: require('./bricks/plugins'),
  loader: require('./bricks/loader'),
  loaders: require('./bricks/loaders')
})

module.exports = WebpackBricks
