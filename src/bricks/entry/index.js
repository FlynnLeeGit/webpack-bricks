const entryBrick = options => conf => {
  if (!options) {
    conf.entry = {
      main: './src/main.js'
    }
  } else {
    conf.entry = options
  }

  return conf
}

module.exports = entryBrick
