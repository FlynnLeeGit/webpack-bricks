const path = require('path')
const { merge } = require('config-brick')

/**
 * @param { object } opts webpack.output options
 */
module.exports = opts =>
  function output(conf) {
    const defaultOpts = {
      path: path.resolve('dist'),
      filename: 'static/js/[name].js',
      publicPath: '/'
    }

    conf.output = merge(opts)(defaultOpts)
  }
