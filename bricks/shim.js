const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')
const _ = require('lodash')

/**
 * jquery plugins useful by using imports-loader
 * https://www.npmjs.com/package/imports-loader
 * 
 * by disabe amd,cjs to add plugin on $.fn
 * 
 * @param {* array } shims exposesMap 
 * @param {* object } alias aliasMap 
 * 
 * @example 
 * alias = {
 *  "jquery-mCustomScrollbar": "malihu-custom-scrollbar-plugin"
 * }
 * 
 * "shims": [
    "jquery-datetimepicker",
    "jquery-mCustomScrollbar"
  ]
 * 
 * then in your js file
 * import 'jquery-mCustomScrollbar' it will inject 
 * define=false
 * module=false
 * exports=false
 * this=window
 * then load malihu-custom-scrollbar-plugin 
 *
 **/

const shimBrick = (shims = [], alias = {}) => config => {
  const shimLoaders = _.map(shims, shim => {
    const loader = {
      test: require.resolve(alias[shim] ? alias[shim] : shim),
      use:
        'imports-loader?define=>false&module=>false&exports=>false&this=>window'
    }
    return loader
  })
  return addLoader(...shimLoaders)(config)
}
