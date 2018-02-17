const ConfigBrick = require('config-brick')
const chalk = require('chalk')

const WebpackBricks = ConfigBrick.extend()
WebpackBricks.Name = chalk.green('[webpack-bricks]')


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
