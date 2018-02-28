const $ = require('../src/index')

const jsTask = $().lay(
  $.entry(),
  $.output(),
  $.css(),
  $.less(),
  $.image(),
  $.font(),
  $.vue(),
  $.media(),
  $.babel(),
  $.alias({
    '@': __dirname + '/src'
  }),
  $.outputJson('.tmp/config.json')
)

module.exports = jsTask
