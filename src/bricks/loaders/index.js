const $ = require('config-brick')

const loaders = (loaders = []) => conf => {
  return $(conf).merge({
    module: {
      rules: [...loaders]
    }
  })
}

module.exports = loaders
