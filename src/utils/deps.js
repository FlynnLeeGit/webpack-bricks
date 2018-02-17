const { mergeR } = require('config-brick')
const install = require('yarn-install')

const { yellow } = require('chalk')

const deps = (deps, opts) =>
  new Promise((resolve, reject) => {
    const depNotInstalled = []
    deps.forEach(dep => {
      try {
        require.resolve(dep)
      } catch (e) {
        console.log(`[webpack-bricks] dep not installed ${yellow(dep)}`)
        depNotInstalled.push(dep)
      }
    })
    if (depNotInstalled.length) {
      install(depNotInstalled, mergeR({ dev: true })(opts))
      process.nextTick(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })

module.exports = deps
