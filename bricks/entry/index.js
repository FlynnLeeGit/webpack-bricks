const entryBrick = options => config => {
  if (!options) {
    config.entry = {
      main: './src/main.js'
    }
  } else {
    config.entry = options
  }

  return config
}

module.exports = entryBrick
