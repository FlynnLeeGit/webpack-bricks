const merge = require('webpack-merge')

module.exports = (...rules) => config => {
  return merge(config, {
    module: {
      rules: [...rules]
    }
  })
}
