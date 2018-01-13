const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')

const merge = require('webpack-merge')

const happyLessBrick = (options = {}) => config => {
  const HappyPack = require('happypack')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const threadPool = require('./thread-pool')
  
  require('less-loader')
  require('less')
  require('css-loader')
  require('style-loader')

  const defaultOptions = {
    extract: {
      filename: 'static/css/[name].css?[contenthash:7]'
    },
    style: {},
    css: {},
    less: {}
  }
  const { extract, css, less, style } = merge(defaultOptions, options)

  return extract
    ? pipe(
        addPlugin(
          new HappyPack({
            id: 'less-link',
            threadPool,
            loaders: [
              { loader: 'css-loader', options: css },
              { loader: 'less-loader', options: less }
            ]
          })
        ),
        addPlugin(new ExtractTextPlugin(extract)),
        addLoader({
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'happypack/loader?id=less-link'
          })
        })
      )(config)
    : pipe(
        addPlugin(
          new HappyPack({
            id: 'less',
            threadPool,
            loaders: [
              { loader: 'style-loader', options: style },
              { loader: 'css-loader', options: css },
              { loader: 'less-loader', options: less }
            ]
          })
        ),
        addLoader({
          test: /\.less$/,
          use: 'happypack/loader?id=less'
        })
      )(config)
}

module.exports = happyLessBrick
