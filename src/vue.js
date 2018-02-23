const { merge } = require('config-brick')
const loader = require('./loader')
const deps = require('./deps')

module.exports = opts =>
  function vue(conf) {
    deps(['vue-loader', 'vue-template-compiler', 'css-loader', 'style-loader'])
    return loader({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: merge(opts)({})
    })(conf)
  }
