const merge = require('webpack-merge')

// https://www.npmjs.com/package/webpack-dev-server

const devServerBrick = options => config => {

  require('webpack-dev-server')
  
  const defaultOptions = {
    clientLogLevel: 'warning',
    // gzip
    compress: true,
    // for local network debug
    host: '0.0.0.0',
    // not auto open browser
    open: false,
    // error Overlay 
    overlay: { warnings: false, errors: true }
  }
  config.devServer = merge(defaultOptions, options)

  return config
}

module.exports = devServerBrick
