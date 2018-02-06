const path = require('path')
const $wb = require('../../core')

const outputBrick = opts => conf => {
  const defaultOpts = {
    path: path.resolve('dist'),
    filename: 'static/js/[name].js',
    publicPath: '/'
  }

  conf.output = $wb(defaultOpts)
    .merge(opts)
    .value()
  return conf
}

module.exports = outputBrick
