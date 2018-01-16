const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')
const _ = require('lodash')

/**
 * expose var by using expose-loader
 * https://www.npmjs.com/package/expose-loader
 * 
 * @param {* object } exposes exposesMap 
 * @param {* object } alias aliasMap 
 * 
 * @example 
 * alias = {
 *  "jquery": "jquery/dist/jquery.min",
 * }
 * 
 * exposes = {
 *    "$": "jquery",
      "jQuery": "jquery",
 * }
 * 
 * then in your js file
 * import 'jquery' it will load jquery/dist/jquery.min && global.$=global.jQuery= jquery/dist/jquery.min 
 */
const exposeBrick = (exposes = {}, alias = {}) => config => {
  depInstaller('expose-loader')

  const exposeLoaders = _.map(exposes, (exposeModule, exposeVar) => {
    const loader = {
      test: require.resolve(
        alias[exposeModule] ? alias[exposeModule] : exposeModule
      ),
      use: `expose-loader?${exposeVar}`
    }
    return loader
  })
  return addLoader(...exposeLoaders)(config)
}

module.exports = exposeBrick