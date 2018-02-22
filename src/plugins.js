const { merge } = require('config-brick')

module.exports = (plugins = []) => conf =>
  merge({
    plugins: [...plugins]
  })(conf)
