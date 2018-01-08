const merge = require('webpack-merge')

module.exports = rule => config => {
  console.log('rule-->', rule, '<--')
  return merge(config, {
    module: {
      rules: [rule]
    }
  })
}
