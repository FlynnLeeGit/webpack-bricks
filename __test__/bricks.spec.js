const $ = require('../src/index')
const deps = require('../src/deps')
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
    this.sassFile = path.join(this.staticPath, 'css', 'sass.css')
    this.twigFile = path.join(this.staticPath, 'js', 'twig.js')
    this.uglifyFile = path.join(this.staticPath, 'js', 'uglify.js')
  }
}

const urls = new Urls()
class WebpackBuilder {
  constructor(userConfig) {
    this.webpackConfig = Object.assign(
      {
        context: __dirname,
        optimization: {
          // disabel uglify in test
          minimize: false
        }
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
      // console.log(stats.toString({
      //   colors:true
      // }))
      expect(stats.hasErrors()).toBe(false)
      cb(stats)
    })
  }
}

describe('deps uitls work', () => {
  test('should exist', () => {
    expect(deps).toBeDefined()
  })
  test('should install deps when there is not in node_modules', done => {
    const nodeModules = path.resolve(__dirname, '..', 'node_modules')
    const isarray = path.join(nodeModules, 'isarray')

    fse.removeSync(isarray)
    deps(['isarray'])
  })
})

describe('plugins brick', () => {
  test('should default ok', () => {
    expect($().lay($.plugin())).toEqual({
      plugins: []
    })
    expect($().lay($.plugins())).toEqual({
      plugins: []
    })
  })
  test('should add plugin object', () => {
    const Plugin = function() {
      this.a = 1
    }
    const conf = $().lay($.plugin(new Plugin()))
    expect(conf).toEqual({
      plugins: [{ a: 1 }]
    })
    const conf2 = $().lay(
      //
      $.plugins([new Plugin()])
    )
    expect(conf2).toEqual({
      plugins: [{ a: 1 }]
    })
  })
})

describe('loaders brick', () => {
  test('should default ok', () => {
    expect($().lay($.loaders())).toEqual({
      module: {
        rules: []
      }
    })
  })
  test('should add loader object', () => {
    const demoRule = { test: /\.js$/, loader: 'vue-loader' }
    const conf = $().lay($.loader(demoRule))
    expect(conf).toEqual({
      module: {
        rules: [demoRule]
      }
    })
    const conf2 = $().lay($.loaders([demoRule]))
    expect(conf2).toEqual({
      module: {
        rules: [demoRule]
      }
    })
  })
})

describe('entry brick', () => {
  test('default entry  shoud be main: ./src/main.js', () => {
    const conf = $().lay($.entry())
    expect(conf).toEqual({
      entry: {
        main: './src/main.js'
      }
    })
  })
  test('should use user entry', () => {
    const conf = $().lay(
      $.entry({
        one: './src/one.js'
      })
    )
    expect(conf).toEqual({
      entry: {
        one: './src/one.js'
      }
    })
  })
})

describe('devtool brick', () => {
  test('should default ok', () => {
    const conf = $().lay($.devtool())
    expect(conf).toEqual({
      devtool: 'source-map'
    })
  })
  test('should work', () => {
    const conf = $().lay($.devtool('eval-source-map'))
    expect(conf).toEqual({
      devtool: 'eval-source-map'
    })
  })
})

describe('entries brick', () => {
  test('should default ok', () => {
    const conf = $().lay($.entries())
    expect(conf).toEqual({
      entry: {}
    })
  })
  test('should glob array path pattern ok', () => {
    const conf = $().lay(
      $.entries([path.join(__dirname, './src/less/**/!(_*).less')])
    )
    expect(conf).toMatchSnapshot()
  })
  test('should glob string path ok', () => {
    const conf = $().lay(
      $.entries(path.join(__dirname, './src/less/**/!(_*).less'))
    )
    expect(conf).toMatchSnapshot()
  })
  test('should no wild entry ok', () => {
    const conf = $().lay($.entries(path.join(__dirname, './src/less/a.less')))
    expect(conf).toMatchSnapshot()
  })
  test('should magic sign ok', () => {
    const conf = $().lay(
      $.entries(path.join(__dirname, './src/less/!(_*).less'))
    )
    expect(conf).toMatchSnapshot()
  })
})

describe('output brick', () => {
  test('should merge userOptions', () => {
    const conf = $().lay(
      $.output({
        publicPath: '/dist/',
        chunkFileName: '[id].[name].js'
      })
    )
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
  test('babel should work', done => {
    const conf = $().lay(
      $.entry(),
      $.output({
        path: urls.outputPath
      }),
      $.babel()
    )
    new WebpackBuilder(conf).compile(() => {
      const file = fse.readFileSync(urls.jsFile, 'utf-8')
      expect(file).toMatchSnapshot()
      done()
    })
  })
})

describe('vue brick', () => {
  test('vue should work', done => {
    const conf = $().lay(
      $.entry({
        vue: './src/vue.js'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.vue()
    )
    new WebpackBuilder(conf).compile(() => {
      const file = fse.readFileSync(urls.vueFile, 'utf-8')
      expect(file).toMatchSnapshot()
      done()
    })
  })
})

describe('image brick', () => {
  test('should image default correct', () => {
    expect($().lay($.image())).toMatchSnapshot()
  })
})
describe('font brick', () => {
  test('should font default correct', () => {
    expect($().lay($.font())).toMatchSnapshot()
  })
})
describe('media brick', () => {
  test('should media default correct', () => {
    expect($().lay($.media())).toMatchSnapshot()
  })
})
describe('css brick', () => {
  test('should work', done => {
    const conf = $().lay(
      $.entry({
        css: './src/css.css'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.css()
    )

    new WebpackBuilder(conf).compile(() => {
      const css = fse.readFileSync(urls.cssFile, 'utf-8')
      expect(css).toMatchSnapshot()
      done()
    })
  })
  test('should not extract', done => {
    const conf = $().lay(
      $.entry({
        less: './src/css.css'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.css({
        extract: false
      })
    )
    new WebpackBuilder(conf).compile(() => {
      expect(() => {
        fse.readFileSync(urls.cssFile, 'utf-8')
      }).toThrow()
      done()
    })
  })
})

describe('less brick', () => {
  test('should work', done => {
    const conf = $().lay(
      $.entry({
        less: './src/less.less'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.less()
    )
    new WebpackBuilder(conf).compile(() => {
      const less = fse.readFileSync(urls.lessFile, 'utf-8')
      expect(less).toMatchSnapshot()
      done()
    })
  })
  test('should not extract', done => {
    const conf = $().lay(
      $.entry({
        less: './src/less.less'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.less({
        extract: false
      })
    )
    new WebpackBuilder(conf).compile(() => {
      expect(() => {
        fse.readFileSync(urls.lessFile, 'utf-8')
      }).toThrow()
      done()
    })
  })
})

describe('sass brick test', () => {
  test('should scss link work', done => {
    const conf = $().lay(
      $.entry({
        sass: './src/sass.scss'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.sass()
    )
    new WebpackBuilder(conf).compile(() => {
      const sass = fse.readFileSync(urls.sassFile, 'utf-8')
      expect(sass).toMatchSnapshot()
      done()
    })
  })
  test('should scss not extract', done => {
    const conf = $().lay(
      $.entry({
        sass: './src/sass.scss'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.sass({
        extract: false
      })
    )

    new WebpackBuilder(conf).compile(() => {
      expect(() => {
        fse.readFileSync(urls.sassFile, 'utf-8')
      }).toThrow()
      done()
    })
  })
  test('should sass link work', done => {
    const conf = $().lay(
      $.entry({
        sass: './src/sass.sass'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.sass()
    )

    new WebpackBuilder(conf).compile(() => {
      const sass = fse.readFileSync(urls.sassFile, 'utf-8')
      expect(sass).toMatchSnapshot()
      done()
    })
  })
  test('should sass not extract', done => {
    const conf = $().lay(
      $.entry({
        sass: './src/sass.sass'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.sass({
        extract: false
      })
    )

    new WebpackBuilder(conf).compile(() => {
      expect(() => {
        fse.readFileSync(urls.sassFile, 'utf-8')
      }).toThrow()
      done()
    })
  })
})

describe('alias brick', () => {
  test('should alias correct', () => {
    expect(
      $().lay(
        $.alias({
          '@': __dirname + '/src'
        })
      )
    ).toMatchSnapshot()
  })
})

describe('tailAlias brick', () => {
  test('should default correct', () => {
    expect($().lay($.tailAlias())).toEqual({
      resolve: {
        alias: {}
      }
    })
  })

  test('should tail Alias correct', () => {
    expect(
      $().lay(
        $.tailAlias({
          vue: 'vue/dist/vue.js'
        })
      )
    ).toMatchSnapshot()
  })
})

describe('twig brick', () => {
  test('should work', () => {
    expect($().lay($.twig())).toMatchSnapshot()
  })
})

describe('extensions brick', () => {
  test('should default work', () => {
    expect($().lay($.extensions())).toMatchSnapshot()
  })
  test('should add work', () => {
    expect($().lay($.extensions(['.cc']))).toMatchSnapshot()
  })
})

describe('uglify brick', () => {
  test('should uglify ok', done => {
    const conf = $().lay(
      $.entry({
        uglify: './src/uglify.js'
      }),
      $.output({
        path: urls.outputPath
      }),
      $.uglify()
    )

    new WebpackBuilder(conf).compile(() => {
      const uglifyFile = fse.readFileSync(urls.uglifyFile, 'utf-8')
      expect(uglifyFile).toMatchSnapshot()
      done()
    })
  })
})
