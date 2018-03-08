## alias brick

$.alias

```js
// just wrapper of resolve.alias config

$().lay(
  $.alias({
    '@': path.resolve('src')
  })
)

// in you js file
import '@/assets/test.png' // -> import 'src/assets/test.png'
```

### $.tailAlias

like alias,but add '$' at name's tail

```js
// just wrapper of resolve.alias config
$().lay(
  $.tailAlias({
    'jquery-datetimepicker':
      'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js',
    'jquery-datetimepicker.style':
      'jquery-datetimepicker/build/jquery.datetimepicker.min.css'
  })
)

// in you js file
import 'jquery-datetimepicker'
import 'jquery-datetimepicker.style'
// it will just find the tail
```
