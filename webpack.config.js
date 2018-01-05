const {
  createConfig,
  entry,
  output,
  happyBabel,
  happyVue,
  url,
  devServer,
  html,
  env,
  when,
  alias,
  extensions,
  custom,
  devtool,
  uglifyParallel
} = require('./index.js')

const config = createConfig([
  entry(),
  output(),
  happyBabel(),
  happyVue(),
  url('img'),
  url('media'),
  url('font'),
  alias(),
  extensions(['.vue', '.json']),
  html(),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap'), uglifyParallel()])
])

console.log('config', config)

module.exports = config
