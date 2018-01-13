const pipe = require('./pipe')

module.exports = brickFns => {
  try {
    return pipe(...brickFns)({})
  } catch (err) {
    console.log('[webpack-bricks -> [createConfig] -> brick error]', err)
  }
}