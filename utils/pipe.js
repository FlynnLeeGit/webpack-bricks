const pipe = (...fns) => data => fns.reduce((res, fn) => fn(res), data)
module.exports = pipe
