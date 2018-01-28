exports.entry = require('./entry')
exports.output = require('./output')
exports.devtool = require('./devtool')

exports.devServer = require('./devServer')

// resolves
exports.extensions = require('./extensions')
exports.alias = require('./alias')
exports.tailAlias = require('./alias/tail')

//loaders
exports.image = require('./image')
exports.font = require('./font')
exports.media = require('./media')
exports.hbs = require('./hbs')
exports.twig = require('./twig')

// plugins
exports.uglify = require('./uglify')

// happy-bricks
exports.babel = require('./happy-bricks/babel')
exports.vue = require('./happy-bricks/vue')
exports.less = require('./happy-bricks/less')
exports.css = require('./happy-bricks/css')

// if
exports.env = require('./env')
exports.when = require('./when')

// other
exports.extend = require('./extend')
