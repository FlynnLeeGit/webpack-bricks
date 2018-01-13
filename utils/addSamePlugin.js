const merge = require('webpack-merge')
module.exports = (Plugin, pluginsOptions = [], sharedOption = {}) => config => {
  return merge(config, {
    plugins: [
      ...pluginsOptions.map(option => new Plugin(merge(sharedOption, option)))
    ]
  })
}
