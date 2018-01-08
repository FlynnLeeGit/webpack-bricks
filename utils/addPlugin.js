const merge = require('webpack-merge')

module.exports = arg => config => {
  if (Array.isArray(arg)) {
    return merge(config, {
      plugins: [...arg]
    })
  }
  return merge(config, {
    plugins: [arg]
  })
}
