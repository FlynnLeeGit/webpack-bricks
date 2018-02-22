const $ = require('../src/index')

const jsTask = $().lay(
  $.entry(),
  $.output(),
  $.alias({
    '@': __dirname + '/src'
  }),
  $.image(),
  $.font(),
  $.media(),
  $.babel(),
  $.vue(),
  $.css(),
  $.less(),
  $.outputJson('.tmp/config.json')
)

module.exports = jsTask
