const $ = require('./src/index')

function P() {
  this.name = 'abc'
}
// const createJs = $.lay($.babel())
const isProd = process.env.NODE_ENV === 'production'

const p = $().lay($.vue(),$.outputJson())
p.then(conf=>{
  console.log(conf)
})
