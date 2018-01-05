const merge = require('webpack-merge')
module.exports = (config, plugin) => {
  return merge(config, {
    plugins: [plugin]
  })
}
