const { merge } = require('config-brick')

module.exports = (opts = []) =>
  function plugins(conf) {
    return merge({
      plugins: [...opts]
    })(conf)
  }
