const { merge } = require('config-brick')

/**
 * plugin brick
 * @param { array } plugins
 * @param { object } conf
 * @return { object }
 * @example
 *
 */
module.exports = (...plugins) => conf =>
  merge({
    plugins: [...plugins]
  })(conf)
