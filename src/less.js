const $ = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')

const deps = require('./deps')
const _ = require('lodash')

module.exports = opts =>
  function less(conf) {
    deps([
      'extract-text-webpack-plugin',
      'css-loader',
      'style-loader',
      'less',
      'less-loader'
    ])
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
          $.if(!extracted, [plugin(new ExtractTextPlugin(extract))]),
          loader({
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader', options: css },
                { loader: 'less-loader', options: less }
              ]
            })
          })
        )(conf)
      : $.lay(
          loader({
            test: /\.less$/,
            use: [
              { loader: 'style-loader', options: style },
              { loader: 'css-loader', options: css },
              { loader: 'less-loader', options: less }
            ]
          })
        )(conf)
  }
