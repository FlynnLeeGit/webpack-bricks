const HappyPack = require('happypack')

const threadPool = HappyPack.ThreadPool({
  size: require('os').cpus().length,
  verbose: false
})

module.exports = threadPool