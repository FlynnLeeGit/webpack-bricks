const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const when = require('../when')
const depInstaller = require('../../utils/depInstaller')
const merge = require('webpack-merge')

const happyCssBrick = (options = {}) => config => {
  depInstaller(
    'happypack',
    'extract-text-webpack-plugin',
    'css-loader',
    'style-loader'
  )

  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  const defaultOptions = {
    extract: {
      filename: 'static/css/[name].css?[contenthash:7]'
    },
    style: {},
    css: {}
  }
  const { extract, css, style } = merge(defaultOptions, options)

  let config_new
  if (extract) {
    const isExtracted = process.env.BRICKS_EXTRACTED_CSS

    config_new = pipe(
      addPlugin(
        new HappyPack({
          id: 'css-link',
          threadPool,
          loaders: [{ loader: 'css-loader', options: css }]
        })
      ),
      when(!isExtracted, [addPlugin(new ExtractTextPlugin(extract))]),
      addLoader({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=css-link'
        })
      })
    )(config)
    process.env.BRICKS_EXTRACTED_CSS = true

  } else {
    config_new = pipe(
      addPlugin(
        new HappyPack({
          id: 'css',
          threadPool,
          loaders: [
            { loader: 'style-loader', options: style },
            { loader: 'css-loader', options: css }
          ]
        })
      ),
      addLoader({
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      })
    )(config)
  }

  return config_new
}

module.exports = happyCssBrick
