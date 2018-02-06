const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')
const _ = require('lodash')

const happyCssBrick = opts => (conf, next) => {
  deps([
    'happypack',
    'extract-text-webpack-plugin',
    'css-loader',
    'style-loader',
    'less',
    'less-loader'
  ]).then(() => {
    const HappyPack = require('happypack')
    const threadPool = require('./thread-pool')
    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    const { css, style, extract, less } = $wb({
      extract: {
        filename: 'static/css/[name].css?[contenthash:8]'
      },
      css: {},
      less: {},
      style: {}
    })
      .merge(opts)
      .value()

    const extracted = _.find(conf.plugins, {
      filename: extract.filename
    })

    const new_conf = extract
      ? $wb(conf)
          .plugin(
            new HappyPack({
              id: 'less-link',
              threadPool,
              loaders: [
                { loader: 'css-loader', options: css },
                { loader: 'less-loader', options: less }
              ]
            })
          )
          .if(!extracted, c =>
            $wb(c)
              .plugin(new ExtractTextPlugin(extract))
              .value()
          )
          .loader({
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'happypack/loader?id=less-link'
            })
          })
          .value()
      : $wb(conf)
          .plugin(
            new HappyPack({
              id: 'less',
              threadPool,
              loaders: [
                { loader: 'style-loader', options: style },
                { loader: 'css-loader', options: css },
                { loader: 'less-loader', options: less }
              ]
            })
          )
          .loader({
            test: /\.less$/,
            use: 'happypack/loader?id=less'
          })
          .value()
    next(new_conf)
  })
}

module.exports = happyCssBrick
