const ConfigBrick = require('config-brick')

const WebpackBricks = ConfigBrick.extend()
WebpackBricks.config.title = '[webpack-bricks]'
WebpackBricks.config.theme = 'green'

module.exports = WebpackBricks
