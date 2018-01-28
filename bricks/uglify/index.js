const merge = require('webpack-merge')
const addPlugin = require('../../utils/addPlugin')

const uglifyParallelBrick = options => config => {
  // https://www.npmjs.com/package/webpack-uglify-parallel
  const Uglify = require('webpack').optimize.UglifyJsPlugin

  const defaultOptions = {
    output: {
      beautify: false
      // comments: false
    },
    compress: {
      // 删除无用警告
      warnings: false,
      // 删除所有console语句
      drop_console: true,
      // 合并var声明
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true
    },
    parallel: true
  }
  const uglifyOptions = merge(defaultOptions, options)
  return addPlugin(new Uglify(uglifyOptions))(config)
}

module.exports = uglifyParallelBrick
