## Webpack-Bricks

#### simply webpack config use standard brick function

powered by [config-brick](https://www.npmjs.com/package/config-brick)

let's start by a simple vue config

```js
const $wb = require('webpack-bricks')

module.exports = $wb()
  .entry()
  .output()
  .vue()
  .image()
  .font()
  .media()
  .css()
  .babel()
  .alias({
    '@': __dirname + '/src'
  })
  .toJson()
  .value()

// that's it!
// because use toJson()
// you will find a config.json in process.cwd() location,that's the final config file json
```

### custom brick

use standard brick function(SBF) to build config

```js
const $wb = require('webpack-bricks')
const fn1 = opts => conf => {
  conf.a = 1
  return conf
}
// register bricks
$wb.registerBrick({
  fn1
})

// use it
const conf = $wb()
  .fn1()
  .value()
// -> {a:1}
```

#### pass SBF arguments

```js
const fn2 = opts => conf => {
  conf.b = opts.b
  return conf
}

$wb.registerBrick({
  fn2
})

// notice call value() to get final result
$wb()
  .fn2({
    b: 2
  })
  .value()
// -> {b:2}
```

### initialSeedConfig

```js
$b({ c: 3 })
  .fn1()
  .fn2({ b: 2 })
  .value()
// -> {a:1,b:2,c:3}
```

## some internal bricks from config-brick

### merge

concat when it's array

```js
$wb({ a: [1], b: 2 })
  .merge({ a: [2], b: 3 })
  .value()

// -> {a:[1,2],b:3}
```

but will ignore when array's element is equal (use `lodash.equal`)

```js
$wb({ a: [1] })
  .merge({ a: [1] })
  .value()
// -> {a:[1]}
```

### if

true will use the truthyConf
false will use the falsyConf

```js
const bool = true
$b()
  .if(
    bool,
    conf => {
      $b(conf)
        .fn1()
        .value()
    },
    conf =>
      $b(conf)
        .fn2()
        .value()
  )
  .value()
// true will be {a:1}
// false will be {b:2}
```
when it's a array
it will pipe the function as the final result
```js
$b().if(bool, [fn1()], [fn2()])
```

#### debug mode

if you want to debug which config really added,just add a .debug() fn
like this

```js
$b()
  .debug()
  .entry()
  .output()
  .value()
```

in terminal it will print

```shell
[webpack-bricks] brick [entry] layed (6ms)
 { added: { entry: { main: './src/main.js' } },
  deleted: {},
  updated: {} }

[webpack-bricks] brick [output] layed (1ms)
 { added:
   { output:
      { path: '/Users/lee/Documents/company/webpack-bricks/examples/dist',
        filename: 'static/js/[name].js',
        publicPath: '/' } },
  deleted: {},
  updated: {} }
```

### example bricks

create a loader

```js
const $wb = require('webpack-bricks')

const simpleBabelBrick = opts => conf => {
  const defaultOpts = {
    cacheDirectory: true
  }
  return $wb(conf)
    .loader({
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: $wb(defaultOpts)
        .merge(opts)
        .value()
    })
    .value()
}

// register
$wb.registerBrick({
  simpleBabel
})
// use
$wb()
  .simpleBabel()
  .value()

// will be
// {
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         options: {
//           cacheDirectory: true
//         }
//       }
//     ]
//   }
// }
```
