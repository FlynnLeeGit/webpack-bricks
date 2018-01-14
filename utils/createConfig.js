const pipe = require('./pipe')

module.exports = brickFns => pipe(...brickFns)({})
