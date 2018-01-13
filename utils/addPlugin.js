const merge = require('webpack-merge')

module.exports = (...args) => config => {
  return merge(config, {
    plugins: [...args]
  })
}
