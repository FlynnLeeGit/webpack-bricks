const { spawnSync } = require('child_process')
const { warn, log } = require('./debuger')

const exectuers = {
  yarn: deps => spawnSync('yarn', ['add', '-D', ...deps], { stdio: 'inherit' }),
  cnpm: deps =>
    spawnSync('cnpm', ['install', '-D', ...deps], { stdio: 'inherit' }),
  npm: deps =>
    spawnSync('npm', ['install', '-D', ...deps], { stdio: 'inherit' })
}

const depIntaller = (...deps) => {
  const depNotInstalled = []
  deps.forEach(dep => {
    try {
      require.resolve(dep)
    } catch (e) {
      warn(`[${dep}] not yet installed`)
      depNotInstalled.push(dep)
    }
  })
  if (depNotInstalled.length) {
    let client
    try {
      const pkgPath = process.cwd() + '/package.json'
      const pkg = require(pkgPath)
      client = pkg['webpack-bricks']['client']
    } catch (e) {
      client = 'yarn'
    }
    log(
      `[ ${depNotInstalled.toString()} ] installing by using [ ${client} ]...`
    )
    exectuers[client](depNotInstalled)
  }
}

module.exports = depIntaller
