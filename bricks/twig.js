const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')
const merge = require('webpack-merge')

const twigBrick = (options = {}) => config => {
  depInstaller('twig-loader')

  const defaultOptions = {
    test: /\.twig$/,
    loader: 'twig-loader',
    options: {}
  }
  const twigOptions = merge(defaultOptions, options)
  return addLoader(twigOptions)(config)
}

module.exports = twigBrick
