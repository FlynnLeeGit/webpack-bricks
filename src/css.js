const $ = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')

const deps = require('./deps')
const _ = require('lodash')

module.exports = options =>
  function css(conf) {
    deps([
      'happypack',
      'extract-text-webpack-plugin',
      'css-loader',
      'style-loader'
    ])
    const HappyPack = require('happypack')
    const threadPool = require('./_thread-pool')
    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    const defaultOptions = {
      extract: {
        filename: 'static/css/[name].css?[contenthash:8]'
      },
      css: {},
      style: {}
    }
    const { css, style, extract } = $.merge(options)(defaultOptions)

    const extracted = _.find(conf.plugins, {
      filename: extract.filename
    })
    return extract
      ? $.lay(
          plugin(
            new HappyPack({
              id: 'css-link',
              threadPool,
              loaders: [{ loader: 'css-loader', options: css }]
            })
          ),
          $.if(!extracted, [plugin(new ExtractTextPlugin(extract))]),
          loader({
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'happypack/loader?id=css-link'
            })
          })
        )(conf)
      : $.lay(
          plugin(
            new HappyPack({
              id: 'css',
              threadPool,
              loaders: [
                { loader: 'style-loader', options: style },
                { loader: 'css-loader', options: css }
              ]
            })
          ),
          loader({
            test: /\.css$/,
            use: 'happypack/loader?id=css'
          })
        )(conf)
  }
