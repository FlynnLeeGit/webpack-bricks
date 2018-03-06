const $ = require('../src/index')

const jsTask = $().lay(
  $.entry({
    page1:__dirname + '/src/page1',
    page2:__dirname  + '/src/page2'
  }),
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
