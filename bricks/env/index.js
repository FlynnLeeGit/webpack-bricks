const pipe = require('../../utils/pipe')

const NODE_ENV = process.env.NODE_ENV || 'develop'

const envBrick = (envName, bricks) => config => {
  return envName === NODE_ENV ? pipe(...bricks)(config) : config
}

module.exports = envBrick
