const _ = require('lodash')
const alias = require('./index')

/**
 * easy wrapper for alias module
 * @param {* object } options  
 * @example
 * 
 * paths = {
 * "jquery-datetimepicker":
      "jquery-datetimepicker/build/jquery.datetimepicker.full.min.js",
    "jquery-datetimepicker.style":
      "jquery-datetimepicker/build/jquery.datetimepicker.min.css"
  }
    then you can 
    import 'jquery-datetimepicker'
    import 'jquery-datetimepicker.style'
 */
const tailAliasBrick = (options = {}) => config => {
  return alias(_.mapKeys(options, (v, k) => k + '$'))(config)
}

module.exports = tailAliasBrick
