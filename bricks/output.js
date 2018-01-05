const path = require('path')

const outputBrick = options => config => {
  const defaultOptions = {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  }
  config.output = Object.assign({}, defaultOptions, options)
  return config
}

module.exports = outputBrick
