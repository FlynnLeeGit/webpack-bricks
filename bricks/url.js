const addLoader = require('../utils/addLoader')

// https://www.npmjs.com/package/url-loader

const urlBrick = (type, options) => config => {
  let defaultOptions = {
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
  switch (type) {
    case 'img':
      defaultOptions.test = /\.(png|jpe?g|gif|svg)(\?.*)?$/
      defaultOptions.options.name = `static/img/[name].[ext]?[hash:7]`
      break
    case 'media':
      defaultOptions.test = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/
      defaultOptions.options.name = `static/media/[name].[ext]?[hash:7]`
      break
    case 'font':
      defaultOptions.test = /\.(woff2?|eot|ttf|otf)(\?.*)?$/
      defaultOptions.options.name = `static/font/[name].[ext]?[hash:7]`
      break
    default:
  }

  const urlRule = Object.assign({}, defaultOptions, options)

  return addLoader(config, urlRule)
}

module.exports = urlBrick
