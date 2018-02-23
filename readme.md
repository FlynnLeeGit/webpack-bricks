## Webpack-Bricks

#### simply webpack config use standard brick function

powered by [config-brick](https://www.npmjs.com/package/config-brick)

let's start by a simple vue config

```js
const $ = require('webpack-bricks')
const conf = $().lay(
  $.entry(),
  $.output(),
  $.alias({
    '@': __dirname + '/src'
  }),
  $.if(
    process.env.NODE_ENV === 'production',
    [$.devtool('source-map')],
    [$.devtool('eval-source-map')]
  ),
  $.image(),
  $.font(),
  $.media(),
  $.babel(),
  $.vue(),
  $.css(),
  $.less(),
  $.outputJson('.tmp/config.json')
)
// that's it!
// because use outputJson()
// you will find a config.json in process.cwd() location,that's the final config file json
module.exports = conf
```

### auto install devDependencies

because it could use async function,so now it will auto install devDependencies

### custom brick

use standard brick function(SBF) to build config

```js
const $ = require('webpack-bricks')
const fn1 = opts => conf => {
  conf.a = 1
  return conf
}

// use it
$().lay(
  //
  fn1()
)
// -> {a:1}
```

#### pass SBF arguments

```js
const fn2 = opts => conf => {
  conf.b = opts.b
  return conf
}

$().lay(
  //
  fn2({ b: 2 })
)
// -> {b:2}
```

### initialSeedConfig

```js
$({ c: 3 }).lay(
  //
  fn1()
)
// -> {a:1,c:3}
```

## some internal bricks from `config-brick`

### merge

concat when it's array

```js
$({ a: [1, 2], b: 2 }).lay(
  //
  merge({ a: [2], b: 3 })
)
// -> {a:[1,2],b:3

// or use directory

merge({ a: [2], b: 3 })({ a: [1, 2], b: 2 })
// -> {a:[1,2],b:3}
```

### custom brick with auto-install deps

```js
// custom.js
const { deps } = require('webpack-bricks')

module.exports = options =>
  function custom(conf) {
    // sync install deps
    deps(['lodash'])
    conf.custom = {
      customOptions: options
    }
    return conf
  }

// webpack.config.js
const $ = require('webpack-bricks')
const custom = require('./custom.js')
const conf = $().lay(custom({ c: 3 }))
console.log(conf)
// -> {
//   custom:{
//     customOptions: { c : 3 }
//   }
// }
```
