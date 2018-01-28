const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const when = require('../when')
const depInstaller = require('../../utils/depInstaller')

const merge = require('webpack-merge')

const happyLessBrick = (options = {}) => config => {
  depInstaller(
    'happypack',
    'extract-text-webpack-plugin',
    'css-loader',
    'style-loader',
    'less',
    'less-loader'
  )
  const HappyPack = require('happypack')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const threadPool = require('./thread-pool')

  const defaultOptions = {
    extract: {
      filename: 'static/css/[name].css?[contenthash:7]'
    },
    style: {},
    css: {},
    less: {}
  }
  const { extract, css, less, style } = merge(defaultOptions, options)

  let config_new

  if (extract) {
    
    // only one extract plugin is needed

    const isExtracted = process.env.BRICKS_EXTRACTED_CSS
    config_new = pipe(
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
      when(!isExtracted, [addPlugin(new ExtractTextPlugin(extract))]),
      addLoader({
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=less-link'
        })
      })
    )(config)
    process.env.BRICKS_EXTRACTED_CSS = true
  } else {
    config_new = pipe(
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

  return config_new
}

module.exports = happyLessBrick
