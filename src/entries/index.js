const { merge } = require('config-brick')
const path = require('path')

const glob = require('glob')

/**
 * get the min index of magic string
 * @param { string } p globPathPattern
 */
const getMagicIndex = p => {
  const idxArr = []
  const i1 = p.indexOf('*')
  const i2 = p.indexOf('!')
  const i3 = p.indexOf('(')
  if (i1 > -1) idxArr.push(i1)
  if (i2 > -1) idxArr.push(i2)
  if (i3 > -1) idxArr.push(i3)
  if (idxArr.length) {
    return Math.min(...idxArr)
  } else {
    return -1
  }
}
/**
 * entries Brick
 * @param { string | array } globPatterns
 */
module.exports = (globPatterns = []) =>
  function entries(conf) {
    const entries = []

    if (typeof globPatterns === 'string') {
      globPatterns = [globPatterns]
    }

    globPatterns.forEach(globPattern => {
      const files = glob.sync(globPattern)
      const tagIndex = getMagicIndex(globPattern)
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

    const entriesMap = entries.reduce((res, f) => {
      res[f.name] = f.absoluteFilepath
      return res
    }, {})
    return merge({
      entry: entriesMap
    })(conf)
  }
