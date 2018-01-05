const merge = require('webpack-merge')
module.exports = (name, options) => config => {
  const Plugin = require(name + '-webpack-plugin')
  return merge(config, {
    plugins: [new Plugin(options)]
  })
}
