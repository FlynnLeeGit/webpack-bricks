const { merge } = require('config-brick')

const aliasBrick = options =>
  function alias(conf) {
    const defaultOptions = {}
    return merge({
      resolve: {
        alias: merge(options)(defaultOptions)
      }
    })(conf)
  }

module.exports = aliasBrick
