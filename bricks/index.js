module.exports = {
  entry: require('./entry'),
  output: require('./output'),
  devtool: require('./devtool'),

  devServer: require('./devServer'),

  // resolves
  extensions: require('./extensions'),
  alias: require('./alias'),
  path: require('./path'),

  //loaders
  babel: require('./babel'),
  vue: require('./vue'),
  image: require('./image'),
  font: require('./font'),
  media: require('./media'),
  hbs: require('./hbs'),
  art: require('./art'),
  shim: require('./shim'),
  expose: require('./expose'),

  // plugins
  uglify: require('./uglify'),

  // happys
  happyBabel: require('./happy/babel'),
  happyVue: require('./happy/vue'),
  happyLess: require('./happy/less'),
  happyCss: require('./happy/css'),

  // if
  env: require('./env'),
  when: require('./when'),

  // other
  extend: require('./extend')
}
