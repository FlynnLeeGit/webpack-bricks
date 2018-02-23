const { merge } = require('config-brick')
const plugin = require('./plugin')

const deps = require('./deps')

/**
 * UglifyJS webpack brick
 * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 * @param {object} [options] UglifyJS options
 * @return { Promise<Function>}
 */
module.exports = options =>
  function uglify(conf) {
    deps(['uglifyjs-webpack-plugin'])
    
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
    const defaultOptions = {
      parallel: true,
      cache: true,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }
    const uglifyOptions = merge(options)(defaultOptions)
    return plugin(new UglifyJSPlugin(uglifyOptions))(conf)
  }
