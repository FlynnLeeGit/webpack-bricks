const $ = require('config-brick')
const plugin = require('./plugin')
const loader = require('./loader')

const deps = require('./deps')
const _ = require('lodash')

module.exports = opts =>
  function sass(conf) {
    deps([
      'extract-text-webpack-plugin',
      'css-loader',
      'style-loader',
      'node-sass',
      'sass-loader'
    ])
    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    const { css, style, extract, sass } = $.merge(opts)({
      extract: {
        filename: 'static/css/[name].css?[contenthash:8]'
      },
      css: {},
      sass: {},
      style: {}
    })

    const extracted = _.find(conf.plugins, {
      filename: extract.filename
    })
    return extract
      ? $.lay(
          $.if(!extracted, [plugin(new ExtractTextPlugin(extract))]),
          // for .scss
          loader({
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader', options: css },
                { loader: 'sass-loader', options: sass }
              ]
            })
          }),
          // for .sass
          loader({
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader', options: css },
                {
                  loader: 'sass-loader',
                  options: $.merge(sass)({ indentedSyntax: true })
                }
              ]
            })
          })
        )(conf)
      : $.lay(
          // for .scss
          loader({
            test: /\.scss$/,
            use: [
              { loader: 'style-loader', options: style },
              { loader: 'css-loader', options: css },
              { loader: 'sass-loader', options: sass }
            ]
          }),

          // for .sass
          loader({
            test: /\.sass$/,
            use: [
              { loader: 'style-loader', options: style },
              { loader: 'css-loader', options: css },
              {
                loader: 'sass-loader',
                options: $.merge(sass)({ indentedSyntax: true })
              }
            ]
          })
        )(conf)
  }
