const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')

module.exports = (options = {}) => config => {
  depInstaller('art-template', 'art-template-loader')

  return addLoader({
    test: /\.art$/,
    loader: 'art-template-loader',
    options
  })(config)
}
