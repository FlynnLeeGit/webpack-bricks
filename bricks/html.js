const addPlugin = require('../utils/addPlugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlBrick = options => config => {
  const defaultOptions = {
    filename: 'index.html',
    template: './index.html',
    inject: true
  }
  const htmlOptions = Object.assign({}, defaultOptions, options)
  return addPlugin(config, new HtmlWebpackPlugin(htmlOptions))
}

module.exports = htmlBrick
