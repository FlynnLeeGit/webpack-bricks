const { merge } = require('config-brick')
const _ = require('lodash')
module.exports = (options = []) =>
  function extensions(conf) {
    const defaultOptions = ['.js', '.jsx', '.json', '.vue']
    return merge({
      resolve: {
        extensions: _.union(defaultOptions, options)
      }
    })(conf)
  }
