const merge = require('webpack-merge')

module.exports = rule => config => {
  return merge(config, {
    module: {
      rules: [rule]
    }
  })
}
