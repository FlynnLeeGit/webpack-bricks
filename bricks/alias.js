const merge = require('webpack-merge')

const aliasBrick = options => config => {
  const defaultOptions = {}

  const aliasOptions = merge(defaultOptions, options)

  return merge(config, {
    resolve: {
      alias: aliasOptions
    }
  })
}

module.exports = aliasBrick
