const merge = require('webpack-merge')

const addLoader = require('../../utils/addLoader')
const depInstaller = require('../../utils/depInstaller')

const twigBrick = (options = {}) => config => {
  depInstaller('twig-loader')

  const twigOptions = {
    test: /\.twig$/,
    loader: 'twig-loader',
    options
  }
  return addLoader(twigOptions)(config)
}

module.exports = twigBrick
