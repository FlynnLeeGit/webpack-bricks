const $wb = require('../../webpack-bricks')
const path = require('path')

const glob = require('glob')

const globEntryBrick = globPatterns => conf => {
  if (typeof globPatterns === 'string') {
    globPatterns = [globPatterns]
  }

  const entries = []
  globPatterns.forEach(globPattern => {
    const files = glob.sync(globPattern)
    const tagIndex = globPattern.indexOf('*')
    const basedir = globPattern.substr(0, tagIndex)
    files.forEach(filepath => {
      const absoluteFilepath = path.resolve(filepath)
      // less/**/*.less -> *.less
      // less/a.less -> a.less
      const basename = basedir
        ? path.relative(path.resolve(basedir), absoluteFilepath)
        : path.basename(absoluteFilepath)
      const extname = path.extname(basename)
      const name = basename.replace(extname, '')
      entries.push({ name, filepath, absoluteFilepath, extname })
    })
  })

  $wb.state['globEntry:entries'] = entries

  const entriesMap = entries.reduce((res, f) => {
    res[f.name] = f.absoluteFilepath
    return res
  }, {})

  return $wb(conf)
    .merge({
      entry: entriesMap
    })
    .value()
}

module.exports = globEntryBrick
