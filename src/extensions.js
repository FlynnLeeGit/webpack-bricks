const { merge } = require('config-brick')
module.exports = (options = []) =>
  function extensions(conf) {
    return merge({
      resolve: {
        extensions: options
      }
    })(conf)
  }
