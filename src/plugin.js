const { merge } = require('config-brick')

/**
 * plugin brick
 * @param { array } opts
 * @return { Function }
 *
 */
module.exports = (...opts) =>
  function plugin(conf) {
    return merge({
      plugins: [...opts]
    })(conf)
  }
