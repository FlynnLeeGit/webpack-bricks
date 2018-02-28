const { when,lay, pipe, pipeAsync, merge, outputJson } = require('config-brick')

class WebpackBricks {
  constructor(seed = {}) {
    this.seed = seed
  }
  /**
   * async waterfall function,
   * pre output will be next input
   * (a->Promise(seed)->(b->Promise(a))->(c->Promise(c))...->z->Promise(y))
   * @param { Array<Function> } bricks
   * @return { any }
   * @example
   * const build = $().lay(
   *  $.entry()
   *  $.output()
   * )
   * build.then(conf=>{
   *  console.log(conf)
   * })
   */
  lay(...bricks) {
    return lay(...bricks)(this.seed)
  }
}
const wb = function(...args) {
  return new WebpackBricks(...args)
}
wb.if = when
wb.when = when
wb.pipe = pipe
wb.pipeAsync = pipeAsync

wb.merge = merge
wb.outputJson = outputJson
wb.plugins = require('./plugins')
wb.plugin = require('./plugin')
wb.loader = require('./loader')
wb.loaders = require('./loaders')
wb.babel = require('./babel')
wb.entry = require('./entry')
wb.output = require('./output')
wb.entries = require('./entries')
wb.css = require('./css')
wb.less = require('./less')
wb.sass = require('./sass')
wb.vue = require('./vue')
wb.alias = require('./alias')
wb.tailAlias = require('./alias/tail')
wb.font = require('./font')
wb.devtool = require('./devtool')
wb.media = require('./media')
wb.image = require('./image')
wb.deps = require('./deps')
wb.twig = require('./twig')
wb.extensions = require('./extensions')

module.exports = wb
