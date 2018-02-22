const { merge } = require('config-brick')

module.exports = (...loaders) => conf =>
  merge({
    module: {
      rules: [...loaders]
    }
  })(conf)