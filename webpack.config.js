const {
  createConfig,
  entry,
  output,
  happyBabel,
  happyVue,
  happyCss,
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
  happyCss(),
  extensions(['.vue', '.json']),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap'), uglifyParallel()])
])

console.log('_____config all_____', config)

module.exports = config
