const HappyPack = require('happypack')
const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const threadPool = require('./thread-pool')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const happyCssBrick = (options = {}) => config => {
  const defaultOptions = {
    extract: {
      filename: '[name].css?[contenthash:7]'
    },
    style: {},
    css: {}
  }
  const { extract, css, style } = merge(defaultOptions, options)

  return extract
    ? pipe(
        addPlugin(
          new HappyPack({
            id: 'css-link',
            threadPool,
            loaders: [{ loader: 'css-loader', options: css }]
          })
        ),
        addPlugin(new ExtractTextPlugin(extract)),
        addLoader({
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'happypack/loader?id=css-link'
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
              { loader: 'css-loader', options: css }
            ]
          })
        ),
        addLoader({
          test: /\.less$/,
          use: 'happypack/loader?id=css'
        })
      )(config)
}

module.exports = happyCssBrick