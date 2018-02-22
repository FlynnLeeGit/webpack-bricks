const { merge } = require('config-brick')
const loader = require('./loader')
const deps = require('./deps')

module.exports = opts =>
  deps([
    'vue-loader',
    'vue-template-compiler',
    'css-loader',
    'style-loader'
  ]).then(() => {
    const vueBrick = conf =>
      loader({
        test: /\.vue$/,
        loader: 'vue-loader',
        options: merge(opts)({})
      })(conf)
    return vueBrick
  })
