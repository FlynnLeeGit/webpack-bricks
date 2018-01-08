const merge = require('webpack-merge')

module.exports = plugin => config => {
  return merge(config, {
    plugins: [plugin]
  })
}
