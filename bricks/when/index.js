const pipe = require('../../utils/pipe')

/**
 * when condition is true  to excute bricks
 * @param {*} condition
 * @param {*} bricks excute bricks
 */
const whenBrick = (condition, bricks) => config => {
  return !!condition ? pipe(...bricks)(config) : config
}

module.exports = whenBrick
