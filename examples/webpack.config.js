const $ = require('../src/index')

const jsTask = $().lay(
  $.entry(),
  $.output(),
  $.css(),
  $.less(),
  $.sass(),
  $.image(),
  $.font(),
  $.vue(),
  $.media(),
  $.alias({
    '@': __dirname + '/src'
  }),
  $.outputJson('.tmp/config.json')
)

module.exports = jsTask
