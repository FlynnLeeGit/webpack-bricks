const HappyPack = require('happypack')
const pipe = require('../../utils/pipe')
const addLoader = require('../../utils/addLoader')
const addPlugin = require('../../utils/addPlugin')
const threadPool = require('./thread-pool')

const happyLessBrick = ({ extract = false }) => config => {
  const append = pipe(
    addPlugin(
      new HappyPack({
        id: 'less',
        threadPool,
        loaders: extract
          ? ['css-loader', 'less-loader']
          : ['style-loader', 'css-loader', 'less-loader']
      })
    ),
    addLoader({
      test: /\.less$/,
      use: 'happypack/loader?id=less'
    })
  )(config)
  return append
}

module.exports = happyLessBrick
