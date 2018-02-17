const $ = require('config-brick')

const pluginBrick = (plugins = []) => conf => {
  return $(conf).merge({
    plugins: [...plugins]
  })
}

module.exports = pluginBrick
