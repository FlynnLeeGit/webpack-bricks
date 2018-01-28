process.env.BRICKS_ENV = {}
// utils
exports.createConfig = require('./utils/createConfig')
exports.merge = require('webpack-merge')
exports.pipe = require('./utils/pipe')

exports.addLoader = require('./utils/addLoader')
exports.addPlugin = require('./utils/addPlugin')
exports.addSamePlugin = require('./utils/addSamePlugin')


exports.bricks = require('./bricks/index')


