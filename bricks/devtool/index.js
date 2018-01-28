const devtoolBrick = devtool => config => {
  if (!devtool || typeof devtool !== 'string') {
    return config
  }
  config.devtool = devtool
  return config
}

module.exports = devtoolBrick
