const {
  createConfig,
  addSamePlugin,
  addPlugin,
  bricks
} = require('../index.js')

const path = require('path')
const Html = require('html-webpack-plugin')

const config = createConfig([
  bricks.entry(),
  bricks.output(),
  bricks.babel(),
  bricks.alias({
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
  bricks.css(),
  bricks.less(),
  bricks.extensions(['.vue', '.json']),
  bricks.env('develop', [bricks.devServer()]),
  bricks.env('production', [bricks.devtool('sourcemap', bricks.uglify())])
])

console.log('_____config all_____', config)

module.exports = config
