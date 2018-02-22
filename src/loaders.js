const { merge } = require('config-brick')
module.exports = (opts = []) =>
  function loaders(conf) {
    return merge({
      module: {
        rules: [...opts]
      }
    })(conf)
  }
