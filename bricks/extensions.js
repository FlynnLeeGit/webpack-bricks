const path = require('path')
const merge = require('webpack-merge')

const extensionsBrick = options => config => {
  const defaultOptions = ['.js']

  const extensionsOptions = Array.from(new Set([...defaultOptions, ...options]))

  return merge(config, {
    resolve: {
      extensions: extensionsOptions
    }
  })
}

module.exports = extensionsBrick
