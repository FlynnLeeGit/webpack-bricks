const {
  createConfig,
  entry,
  output,
  happyBabel,
  happyVue,
  happyLess,
  url,
  devServer,
  env,
  plugin,
  when,
  alias,
  extensions,
  custom,
  devtool,
  uglifyParallel,
  addPlugin
} = require('./index.js')

const Html = require('html-webpack-plugin')

const path = require('path')

const config = createConfig([
  entry(),
  output(),
  happyBabel(),
  happyVue(),
  url('img'),
  url('media'),
  url('font'),
  alias({
    '@': path.resolve('src')
  }),
  addPlugin(
    new Html({
      template: './index.html'
    })
  ),
  extensions(['.vue', '.json']),
  env('develop', [devServer(), happyLess({ extract: false })]),
  env('production', [devtool('sourcemap'), uglifyParallel(), happyLess()])
])

console.log('_____config all_____', config)

module.exports = config
