const addLoader = require('../utils/addLoader')

module.exports = (options = {}) => config => {
  require('art-template')
  require('art-template-loader')
  
  return addLoader({
    test: /\.art$/,
    loader: 'art-template-loader',
    options
  })(config)
}
