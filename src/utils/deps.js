const $wb = require('../core')
const install = require('yarn-install')

const { yellow } = require('chalk')

const deps = (deps, opts) =>
  new Promise((resolve, reject) => {
    const depNotInstalled = []
    deps.forEach(dep => {
      try {
        require.resolve(dep)
      } catch (e) {
        console.log(`${$wb.themeTitle()} dep not installed ${yellow(dep)}`)
        depNotInstalled.push(dep)
      }
    })
    if (depNotInstalled.length) {
      install(
        depNotInstalled,
        $wb({ dev: true })
          .merge(opts)
          .value()
      )
      process.nextTick(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })

module.exports = deps
