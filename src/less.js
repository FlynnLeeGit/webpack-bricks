const $ = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')

const deps = require('./deps')
const _ = require('lodash')

module.exports = opts =>
  deps([
    'happypack',
    'extract-text-webpack-plugin',
    'css-loader',
    'style-loader',
    'less',
    'less-loader'
  ]).then(() => {
    const lessBrick = conf => {
      const HappyPack = require('happypack')
      const threadPool = require('./_thread-pool')
      const ExtractTextPlugin = require('extract-text-webpack-plugin')

      const { css, style, extract, less } = $.merge(opts)({
        extract: {
          filename: 'static/css/[name].css?[contenthash:8]'
        },
        css: {},
        less: {},
        style: {}
      })

      const extracted = _.find(conf.plugins, {
        filename: extract.filename
      })
      return extract
        ? $.lay(
            plugin(
              new HappyPack({
                id: 'less-link',
                threadPool,
                loaders: [
                  { loader: 'css-loader', options: css },
                  { loader: 'less-loader', options: less }
                ]
              })
            ),
            $.if(!extracted, [plugin(new ExtractTextPlugin(extract))]),
            loader({
              test: /\.less$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'happypack/loader?id=less-link'
              })
            })
          )(conf)
        : $.lay(
            plugin(
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
            loader({
              test: /\.less$/,
              use: 'happypack/loader?id=less'
            })
          )(conf)
    }

    return lessBrick
  })
