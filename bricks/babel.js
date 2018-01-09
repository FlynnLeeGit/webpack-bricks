const addLoader = require('../utils/addLoader')
const merge = require('webpack-merge')

const babelBrick = options => config => {
  require('babel-loader')
  
  const defaultOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      cacheDirectory: true
    }
  }
  const babelOptions = merge(defaultOptions, options)
  return addLoader(babelOptions)(config)
}

module.exports = babelBrick
