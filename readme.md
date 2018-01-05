## Webpack-Bricks

#### simply webpack config use functional config

this project is under develop,api maybe change

define webpack.config.js like this

```js
const {
  createConfig,
  entry,
  output,
  happyBabel,
  happyVue,
  url,
  devServer,
  html,
  env,
  when,
  alias,
  extensions,
  custom,
  devtool,
  uglifyParallel
} = require('webpack-bricks')

const config = createConfig([
  entry(),
  output(),
  happyBabel(),
  happyVue(),
  url('img'),
  url('media'),
  url('font'),
  alias(),
  extensions(['.vue', '.json']),
  html(),
  env('develop', [devServer()]),
  env('production', [devtool('sourcemap'), uglifyParallel()])
])
// that's it!
```

## extend webpack use extend()

```js
  {
    ...
    extend({
      externals:{
        jquery: 'jQuery'
      }
    })
  }
  // will merge config
```

## custom brick

let's make a babelBrick

```js
// babel-brick.js 
const { addLoader, merge } = require('webpack-bricks')

const babelBrick = options => config => {
  const defaultOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      cacheDirectory: true
    }
  }
  const babelOptions = merge(defaultOptions, options)
  return addLoader(config, babelOptions)
}
module.exports = babelBrick

// use in webpack.config.js
const babel = require('./babel-brick')
module.exports = {
  ...babel({
    test: /\.jsx?$/,
    options: {
      presets: [['env']]
    }
  })
}
/*
  will be {
    test:/\.jsx?$/,
    loader:'babel-loader',
    exclude: /node_modules/,
    options:{
      cacheDirectory:true,
      presets: [['env']]
    }
  }
*/
```
