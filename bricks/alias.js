const path = require('path')
const merge = require('webpack-merge')

const aliasBrick = options => config => {
  const defaultOptions = {
    '@': path.resolve('.', 'src')
  }

  const aliasOptions = merge(defaultOptions, options)

  return merge(config, {
    resolve: {
      alias: aliasOptions
    }
  })
}

module.exports = aliasBrick
