const $wb = require('../../webpack-bricks')
const deps = require('../../utils/deps')
const _ = require('lodash')

const happyCssBrick = opts => (conf, next) => {
  deps([
    'happypack',
    'extract-text-webpack-plugin',
    'css-loader',
    'style-loader'
  ]).then(() => {
    const HappyPack = require('happypack')
    const threadPool = require('./thread-pool')
    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    const { css, style, extract } = $wb({
      extract: {
        filename: 'static/css/[name].css?[contenthash:8]'
      },
      css: {},
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
              id: 'css-link',
              threadPool,
              loaders: [{ loader: 'css-loader', options: css }]
            })
          )
          .if(!extracted, c =>
            $wb(c)
              .plugin(new ExtractTextPlugin(extract))
              .value()
          )
          .loader({
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'happypack/loader?id=css-link'
            })
          })
          .value()
      : $wb(conf)
          .plugin(
            new HappyPack({
              id: 'css',
              threadPool,
              loaders: [
                { loader: 'style-loader', options: style },
                { loader: 'css-loader', options: css }
              ]
            })
          )
          .loader({
            test: /\.css$/,
            use: 'happypack/loader?id=css'
          })
          .value()
    next(new_conf)
  })
}

module.exports = happyCssBrick
