const $wb = require('../src/index')
const deps = require('../src/utils/deps')
const fse = require('fs-extra')
const path = require('path')
class Urls {
  constructor(name) {
    this.outputPath = path.join(__dirname, 'dist')
    this.staticPath = path.join(this.outputPath, 'static')
    this.jsFile = path.join(this.staticPath, 'js', 'main.js')
    this.vueFile = path.join(this.staticPath, 'js', 'vue.js')
    this.cssFile = path.join(this.staticPath, 'css', 'css.css')
    this.lessFile = path.join(this.staticPath, 'css', 'less.css')
    this.twigFile = path.join(this.staticPath, 'js', 'twig.js')
  }
}

const urls = new Urls()
class WebpackBuilder {
  constructor(userConfig) {
    this.webpackConfig = Object.assign(
      {
        context: __dirname
      },
      userConfig
    )
  }
  compile(cb) {
    const webpack = require('webpack')
    fse.removeSync(urls.outputPath)

    const compiler = webpack(this.webpackConfig)
    compiler.run((err, stats) => {
      expect(err).toBeFalsy()
      expect(stats.hasErrors()).toBe(false)
      cb(stats)
    })
  }
}

describe('WebpackBricks', () => {
  test('should exist', () => {
    expect($wb).toBeDefined()
  })
})

describe('deps uitls work', () => {
  test('should exist', () => {
    expect(deps).toBeDefined()
  })
  test.skip('should install deps when there is not in node_modules', done => {
    const nodeModules = path.resolve(__dirname, '..', 'node_modules')
    const fileLoader = path.join(nodeModules, 'file-loader')
    fse.removeSync(fileLoader)
    deps(['file-loader']).then(() => {
      require.resolve('file-loader')
      done()
    })
  })
  test('should just resolved when installed', done => {
    deps(['file-loader']).then(done)
  })
})

describe('plugins brick', () => {
  test('exist', () => {
    expect($wb.bricks.plugins).toBeDefined()
    expect($wb.prototype.plugins).toBeDefined()
  })
  test('should add plugin object', () => {
    const Plugin = function() {
      this.a = 1
    }
    const conf = $wb()
      .plugins([new Plugin()])
      .value()
    expect(conf).toEqual({
      plugins: [{ a: 1 }]
    })
  })
})

describe('loaders brick', () => {
  test('exist', () => {
    expect($wb.prototype.loaders).toBeDefined()
    expect($wb.bricks.loaders).toBeDefined()
  })
  test('should add loader object', () => {
    const loader = { test: /\.js$/, loader: 'vue-loader' }
    const conf = $wb()
      .loaders([loader])
      .value()
    expect(conf).toEqual({
      module: {
        rules: [{ test: /\.js$/, loader: 'vue-loader' }]
      }
    })
  })
})

describe('entry brick', () => {
  test('exist', () => {
    expect($wb.prototype.entry).toBeDefined()
    expect($wb.bricks.entry).toBeDefined()
  })
  test('default entry  shoud be main: ./src/main.js', () => {
    const conf = $wb()
      .entry()
      .value()
    expect(conf).toEqual({
      entry: {
        main: './src/main.js'
      }
    })
  })
  test('should use user entry', () => {
    const conf = $wb()
      .entry({
        one: './src/one.js'
      })
      .value()
    expect(conf).toEqual({
      entry: {
        one: './src/one.js'
      }
    })
  })
})

describe('output brick', () => {
  test('exist', () => {
    expect($wb.prototype.output).toBeDefined()
    expect($wb.bricks.output).toBeDefined()
  })
  test('default output equal', () => {
    const conf = $wb()
      .output()
      .value()
    expect(conf).toEqual({
      output: {
        path: path.resolve('dist'),
        filename: 'static/js/[name].js',
        publicPath: '/'
      }
    })
  })
  test('should merge userOptions', () => {
    const conf = $wb()
      .output({
        publicPath: '/dist/',
        chunkFileName: '[id].[name].js'
      })
      .value()
    expect(conf).toEqual({
      output: {
        path: path.resolve('dist'),
        filename: 'static/js/[name].js',
        publicPath: '/dist/',
        chunkFileName: '[id].[name].js'
      }
    })
  })
})

describe('babel brick', () => {
  test('exist', () => {
    expect($wb.prototype.babel).toBeDefined()
    expect($wb.bricks.babel).toBeDefined()
  })
  test('babel should work', done => {
    $wb()
      .entry()
      .output({
        path: urls.outputPath
      })
      .babel()
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          const file = fse.readFileSync(urls.jsFile, 'utf-8')
          expect(file).toMatchSnapshot()
          done()
        })
      })
  })
})

describe('vue brick', () => {
  test('exist', () => {
    expect($wb.prototype.vue).toBeDefined()
    expect($wb.bricks.vue).toBeDefined()
  })

  test('vue should work', done => {
    $wb()
      .entry({
        vue: './src/vue.js'
      })
      .output({
        path: urls.outputPath
      })
      .vue()
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          const file = fse.readFileSync(urls.vueFile, 'utf-8')
          expect(file).toMatchSnapshot()
          done()
        })
      })
  })
})

describe('image brick', () => {
  test('should exist', () => {
    expect($wb.prototype.image).toBeDefined()
    expect($wb.bricks.image).toBeDefined()
  })
  test('should image default correct', done => {
    $wb()
      .image()
      .value()
      .then(conf => {
        expect(conf).toMatchSnapshot()
        done()
      })
  })
})
describe('css brick', () => {
  test('should exist', () => {
    expect($wb.prototype.css).toBeDefined()
    expect($wb.bricks.css).toBeDefined()
  })
  test('should work', done => {
    $wb()
      .entry({
        css: './src/css.css'
      })
      .output({
        path: urls.outputPath
      })
      .css()
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          const css = fse.readFileSync(urls.cssFile, 'utf-8')
          expect(css).toMatchSnapshot()
          done()
        })
      })
  })
  test('should not extract', done => {
    $wb()
      .entry({
        less: './src/css.css'
      })
      .output({
        path: urls.outputPath
      })
      .css({
        extract: false
      })
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          expect(() => {
            fse.readFileSync(urls.cssFile, 'utf-8')
          }).toThrow()
          done()
        })
      })
  })
})

describe('less brick', () => {
  test('should exist', () => {
    expect($wb.prototype.less).toBeDefined()
    expect($wb.bricks.less).toBeDefined()
  })
  test('should work', done => {
    $wb()
      .entry({
        less: './src/less.less'
      })
      .output({
        path: urls.outputPath
      })
      .less()
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          const less = fse.readFileSync(urls.lessFile, 'utf-8')
          expect(less).toMatchSnapshot()
          done()
        })
      })
  })
  test('should not extract', done => {
    $wb()
      .entry({
        less: './src/less.less'
      })
      .output({
        path: urls.outputPath
      })
      .less({
        extract: false
      })
      .value()
      .then(conf => {
        new WebpackBuilder(conf).compile(() => {
          expect(() => {
            fse.readFileSync(urls.lessFile, 'utf-8')
          }).toThrow()
          done()
        })
      })
  })
})
describe('media brick', () => {
  test('should exist', () => {
    expect($wb.prototype.media).toBeDefined()
    expect($wb.bricks.media).toBeDefined()
  })
  test('should media default correct', done => {
    $wb()
      .media()
      .value()
      .then(conf => {
        expect(conf).toMatchSnapshot()
        done()
      })
  })
})

describe('font brick', () => {
  test('should exist', () => {
    expect($wb.prototype.font).toBeDefined()
    expect($wb.bricks.font).toBeDefined()
  })
  test('should font default correct', done => {
    $wb()
      .font()
      .value()
      .then(conf => {
        expect(conf).toMatchSnapshot()
        done()
      })
  })
})

describe('alias brick', () => {
  test('should exist', () => {
    expect($wb.prototype.alias).toBeDefined()
  })
  test('should alias correct', () => {
    expect(
      $wb()
        .alias({
          '@': __dirname + '/src'
        })
        .value()
    ).toMatchSnapshot()
  })
})

describe('tailAlias brick', () => {
  test('should exist', () => {
    expect($wb.prototype.tailAlias).toBeDefined()
  })
  test('should default correct', () => {
    expect(
      $wb()
        .tailAlias()
        .value()
    ).toEqual({
      resolve: {
        alias: {}
      }
    })
  })

  test('should tail Alias correct', () => {
    expect(
      $wb()
        .tailAlias({
          vue: 'vue/dist/vue.js'
        })
        .value()
    ).toMatchSnapshot()
  })
})

describe('twig brick', () => {
  test('should exist', () => {
    expect($wb.prototype.twig).toBeDefined()
  })
  test('should work', done => {
    $wb()
      .twig()
      .value()
      .then(conf => {
        expect(conf).toMatchSnapshot()
        done()
      })
  })
})
