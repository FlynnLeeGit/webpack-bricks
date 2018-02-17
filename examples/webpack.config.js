const $ = require('../src/index')

const p = $wb()
  .entry()
  .output()
  .alias({
    '@': __dirname + '/src'
  })
  .image()
  .font()
  .media()
  .babel()
  .vue()
  .css()
  .less()
  .value()

module.exports = p
