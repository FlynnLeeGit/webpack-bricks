const WebpackBricks = require('./core')

const plugins = require('./bricks/plugins')
const plugin = require('./bricks/plugin')
const loaders = require('./bricks/loaders')
const loader = require('./bricks/loader')

module.exports = WebpackBricks.registerBrick({
  plugins,
  plugin,
  loaders,
  loader
})
