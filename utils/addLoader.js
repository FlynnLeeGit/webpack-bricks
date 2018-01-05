const merge = require('webpack-merge')
module.exports = (config, rule) => {
  return merge(config, {
    module: {
      rules: [rule]
    }
  })
}
