const pipe = (...fns) => data => {
  return fns.reduce((res, fn) => {
    try {
      return fn(res)
    } catch (e) {
      console.log(`[webpack-bricks] -> [${fn.name}] -> brick error]`,e)
    }
  }, data)
}

module.exports = pipe
