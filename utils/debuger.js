const chalk = require('chalk')
const log = console.log
const blue = chalk.blue.bold

const yellow = chalk.yellow

exports.log = msg => log(`${blue('[webpack-bricks]')}`, `${msg}`)
exports.warn = msg => log(`${blue('[webpack-bricks]')}`, `${yellow(msg)}`)
