const $ = require('config-brick')

const aliasBrick = options => conf => {
  const defaultOptions = {}
  return $.merge({
    resolve: {
      alias: $.merge(options)(defaultOptions)
    }
  })(conf)
}

module.exports = aliasBrick
