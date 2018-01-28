## alias brick

### bricks.alias

use

```js
// just wrapper of resolve.alias config

createConfig([
  //...
  alias:{
    @:path.resolve("src")
  }
  //...
])


// in you js file
import '@/assets/test.png' // -> import 'src/assets/test.png'
```

### bricks.tailAlias

like alias,but add '$' at tail content

use

```js
// just wrapper of resolve.alias config

createConfig([
  //...
  tailAlias({
    'jquery-datetimepicker':
      'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js',
    'jquery-datetimepicker.style':
      'jquery-datetimepicker/build/jquery.datetimepicker.min.css'
  })
  //...
])

// in you js file
import 'jquery-datetimepicker'
import 'jquery-datetimepicker.style'
// it will just find the tail
```
