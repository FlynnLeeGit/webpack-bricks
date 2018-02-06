const WebpackBricks = require('./webpack-bricks')

const entry = require('./bricks/entry')
const output = require('./bricks/output')

const babel = require('./bricks/happy-bricks/babel')
const less = require('./bricks/happy-bricks/less')
const css = require('./bricks/happy-bricks/css')

const vue = require('./bricks/vue')
const twig = require('./bricks/twig')

const image = require('./bricks/image')
const font = require('./bricks/font')
const media = require('./bricks/media')

const alias = require('./bricks/alias')
const tailAlias = require('./bricks/alias/tail')

module.exports = WebpackBricks.registerBrick({
  entry,
  output,
  babel,
  vue,
  less,
  css,
  image,
  font,
  media,
  alias,
  twig,
  tailAlias
})
