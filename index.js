const pipe = require('./utils/pipe')

process.env.BRICKS_ENV = {}
// utils
exports.createConfig = brickFns => {
  return pipe(...brickFns)({})
}
exports.addLoader = require('./utils/addLoader')
exports.addLoaders = require('./utils/addLoaders')
exports.addPlugin = require('./utils/addPlugin')
exports.addPlugins = require('./utils/addPlugins')

exports.merge = require('webpack-merge')

exports.entry = require('./bricks/entry')
exports.output = require('./bricks/output')
exports.devtool = require('./bricks/devtool')

exports.devServer = require('./bricks/devServer')

// resolves
exports.extensions = require('./bricks/extensions')
exports.alias = require('./bricks/alias')

//loaders
exports.babel = require('./bricks/babel')
exports.vue = require('./bricks/vue')
exports.url = require('./bricks/url')
exports.hbs = require('./bricks/hbs')
exports.art = require('./bricks/art')

// plugins
exports.uglifyParallel = require('./bricks/uglify-parallel')

// happys
exports.happyBabel = require('./bricks/happy/babel')
exports.happyVue = require('./bricks/happy/vue')
exports.happyLess = require('./bricks/happy/less')
exports.happyCss = require('./bricks/happy/css')

// if
exports.env = require('./bricks/env')
exports.when = require('./bricks/when')

// other
exports.log = require('./bricks/log')
exports.extend = require('./bricks/extend')
