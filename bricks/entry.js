const entryBrick = options => config => {
  config.entry = options || {
    main: './src/main.js'
  }
  return config
}

module.exports = entryBrick