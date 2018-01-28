const merge = require('webpack-merge')
/**
 * extend webpack config use Object or Function
 * @param {[Object|Fucntion]} options   
 */
const extendBricks = (options = {}) => config => {
  if (typeof options === 'object') {
    return merge(config, options)
  }
  if (typeof options === 'function') {
    return options(config)
  }
  console.log('[webpack bricks] custom brick is not object or function')
  return config
}

module.exports = extendBricks
