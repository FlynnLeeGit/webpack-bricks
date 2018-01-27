## Webpack-Bricks

#### simply webpack config use functional config

this project is under develop,api maybe change

define webpack.config.js like this,
now all defined bricks can see in https://github.com/FlynnLeeGit/webpack-bricks/tree/master/bricks

```js
const {
  createConfig,
  addSamePlugin,
  addPlugin,
  bricks: {
    entry,
    output,
    babel,
    vue,
    css,
    env,
    extend,
    extensions,
    image,
    media,
    font,
    alias,
    devServer,
    devtool,
    uglify
  }
} = require('./index.js')

const Html = require('html-webpack-plugin')

const config = createConfig([
  entry(),
  output({}),
  babel(),
  vue(),
  image(),
  media(),
  font(),
  alias({
    '@': path.resolve('src')
  }),
  addSamePlugin(
    Html,
    [
      {
        filename: '1.html'
      },
      {
        filename: '2.html'
      },
      {
        filename: '3.html'
      },
      {
        filename: '4.html'
      },
      {
        filename: '5.html'
      }
    ],
    {
      template: './index.html'
    }
  ),
  css(),
  extensions(['.vue', '.json']),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap', uglify())])
])

module.exports = config

// that's it!
```

## custom bricks

```js
// simplest brick
module.exports = options => config => {
  //[options] your brick options
  //[config] webpackConfig

  config.entry = {
    main: './src/main.js'
  }
  // must return !!
  return config
}
```

## add loader or loaders use addLoader()

```js
// let's add babel-loader && vue-loader
const { createConfig } = require('webpack-bricks')
moudle.exports = createConfig([
  ...
  addLoader(
    // for babel
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        cacheDirectory: true
      },
    }
    // for vue
    {
      test:/\.vue$/,
      loader: 'vue-loader'
    }
  })
  ...
])
```

## or even better to use custom babel brick

let's make a babelBrick

```js
// babel-brick.js
const { addLoader, merge } = require('webpack-bricks')

const babelBrick = (options={}) => config => {
  const defaultOptions = {
    cacheDirectory: true
  }
  const babelOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: merge(defaultOptions,options)
  }
  return addLoader(babelOptions)(config)
}
module.exports = babelBrick

// use in webpack.config.js
const {createConfig} = require('webpack-bricks')
const babel = require('./babel-brick')
module.exports = createConfig([
  ...
  babel({
    presets: [['env']]
  })
  ...
])
/*
  will be {
    test:/\.js$/,
    loader:'babel-loader',
    exclude: /node_modules/,
    options:{
      cacheDirectory:true,
      presets: [['env']]
    }
  }
*/
```

#### cusotm bricks addLoader && addPlugin

```js
const { pipe, addLoader, addPlugin } = require('webpack-bricks')

const happyBabelBrick = options => config => {
  const HappyPack = require('happypack')
  const threadPool = require('./thread-pool')
  const merge = require('webpack-merge')

  require('babel-loader')
  const defaultOptions = {
    cacheDirectory: true
  }
  const babelOptions = merge(defaultOptions, options)

  return pipe(
    addPlugin(
      new HappyPack({
        id: 'babel',
        threadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      })
    ),
    addLoader({
      test: /\.js$/,
      use: 'happypack/loader?id=babel',
      exclude: [/node_modules/]
    })
  )(config)
}

module.exports = happyBabelBrick
```

## extend webpack use extend()

```js
  const { bricks: {extend} } = require('webpack-bricks')
  [
    ...
    extend({
      externals:{
        jquery: 'jQuery'
      }
    })
  ]
  // will merge config
```
