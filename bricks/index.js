module.exports = {
  entry: require('./entry'),
  output: require('./output'),
  devtool: require('./devtool'),

  devServer: require('./devServer'),

  // resolves
  extensions: require('./extensions'),
  alias: require('./alias'),
  paths: require('./paths'),

  //loaders
  image: require('./image'),
  font: require('./font'),
  media: require('./media'),
  hbs: require('./hbs'),
  art: require('./art'),
  twig: require('./twig'),

  // plugins
  uglify: require('./uglify'),

  // happys
  babel: require('./happy/babel'),
  vue: require('./happy/vue'),
  less: require('./happy/less'),
  css: require('./happy/css'),

  // if
  env: require('./env'),
  when: require('./when'),

  // other
  extend: require('./extend')
}
