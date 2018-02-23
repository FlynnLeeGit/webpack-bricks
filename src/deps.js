const { merge } = require('config-brick')
const install = require('yarn-install')
const fs = require('fs')
const path = require('path')
const { yellow, green } = require('chalk')

/**
 * check dep is exist in module.paths
 * @param {string} dep dep name
 * @return {boolean}
 */
const depExistSync = dep =>
  module.paths.some(mDir => fs.existsSync(path.join(mDir, dep)))
/**
 * sync deps installer
 * @param {Array<string>} deps
 * @param {object} opts
 * @return {void}
 */
const deps = (deps, opts, name = green('webpack-bricks')) => {
  const depNotInstalled = []
  deps.forEach(dep => {
    if (!depExistSync(dep)) {
      console.log(`[ ${name} ] dep ${yellow(dep)} not installed `)
      install([dep], merge(opts)({ dev: true }))
    }
  })
}

module.exports = deps
