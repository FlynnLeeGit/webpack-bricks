const $ = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')

const deps = require('./deps')
const _ = require('lodash')

module.exports = options =>
  function css(conf) {
    deps(['extract-text-webpack-plugin', 'css-loader', 'style-loader'])
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
          $.if(!extracted, [plugin(new ExtractTextPlugin(extract))]),
          loader({
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: css
                }
              ]
            })
          })
        )(conf)
      : $.lay(
          loader({
            test: /\.css$/,
            use: [
              { loader: 'style-loader', options: style },
              { loader: 'css-loader', options: css }
            ]
          })
        )(conf)
  }
