const {
  createConfig,
  entry,
  output,
  happyBabel,
  happyVue,
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
} = require('./index.js')

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
  extensions(['.vue', '.json']),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap'), uglifyParallel()])
])

console.log('_____config all_____', config)

module.exports = config
