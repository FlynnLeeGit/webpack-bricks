// utils
const pipe = require('./utils/pipe')
const addLoader = require('./utils/addLoader')
const addPlugin = require('./utils/addPlugin')

const entry = require('./bricks/entry')
const output = require('./bricks/output')

const devServer = require('./bricks/devServer')
const devtool = require('./bricks/devtool')

// resolves
const alias = require('./bricks/alias')
const extensions = require('./bricks/extensions')

// loaders
const babel = require('./bricks/babel')
const vue = require('./bricks/vue')
const url = require('./bricks/url')

// plugins
const html = require('./bricks/html')
const uglifyParallel = require('./bricks/uglify-parallel')

//happys
const happyBabel = require('./bricks/happy/babel')
const happyVue = require('./bricks/happy/vue')

// if
const env = require('./bricks/env')
const when = require('./bricks/when')

// other
const extend = require('./bricks/extend')

// utils
exports.createConfig = brickFns => {
  return pipe(...brickFns)({})
}
exports.addLoader = addLoader
exports.addPlugin = addPlugin
exports.merge = require('webpack-merge')

exports.entry = entry
exports.output = output
exports.devtool = devtool

exports.devServer = devServer

// resolves
exports.extensions = extensions
exports.alias = alias

//loaders
exports.babel = babel
exports.vue = vue
exports.url = url

// plugins
exports.html = html
exports.uglifyParallel = uglifyParallel
exports.plugin = require('./plugin')

// happys
exports.happyBabel = happyBabel
exports.happyVue = happyVue

// if
exports.env = env
exports.when = when

// other
exports.extend = extend
