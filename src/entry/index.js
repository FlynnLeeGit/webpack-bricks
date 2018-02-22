module.exports = options =>
  function entry(conf) {
    if (!options) {
      conf.entry = {
        main: './src/main.js'
      }
    } else {
      conf.entry = options
    }

    return conf
  }
