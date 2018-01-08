const merge = require('webpack-merge')

module.exports = arg => config => {
  return merge(config, {
    plugins: [arg]
  })
}
