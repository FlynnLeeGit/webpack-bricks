const { merge } = require('config-brick')

module.exports = (...opts) =>
  function loader(conf) {
    return merge({
      module: {
        rules: [...opts]
      }
    })(conf)
  }
