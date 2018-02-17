const $ = require('config-brick')

const loaderBrick = (...loaders) => conf => {
  return $(conf).merge({
    module: {
      rules: [...loaders]
    }
  })
}

module.exports = loaderBrick
