const {
  createConfig,
  addSamePlugin,
  addPlugin,
  bricks: {
    entry,
    output,
    happyBabel,
    happyVue,
    happyCss,
    env,
    extend,
    extensions,
    image,
    media,
    font,
    alias,
    devServer,
    devtool,
    uglify
  }
} = require('./index.js')

const Html = require('html-webpack-plugin')

const path = require('path')

const config = createConfig([
  entry(),
  output({}),
  happyBabel(),
  happyVue(),
  image(),
  media(),
  font(),
  alias({
    '@': path.resolve('src')
  }),
  addSamePlugin(
    Html,
    [
      {
        filename: '1.html'
      },
      {
        filename: '2.html'
      },
      {
        filename: '3.html'
      },
      {
        filename: '4.html'
      },
      {
        filename: '5.html'
      }
    ],
    {
      template: './index.html'
    }
  ),
  happyCss(),
  extensions(['.vue', '.json']),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap', uglify())])
])

console.log('_____config all_____', config)

module.exports = config
