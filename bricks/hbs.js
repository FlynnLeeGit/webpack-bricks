const addLoader = require('../utils/addLoader')
const depInstaller = require('../utils/depInstaller')

// https://www.npmjs.com/package/vue-loader

const vueBrick = options => config => {
  depInstaller('handlebars-loader', 'handlerbars')

  const defaultOptions = {
    test: /\.hbs/,
    loader: 'handlebars-loader',
    options: {}
  }
  const hbsRule = Object.assign({}, defaultOptions, options)
  return addLoader(hbsRule)(config)
}

module.exports = vueBrick
