## entries brick

use glob path as webpack entry point
```shell
src.less
├── app.less
├── theme_pink.less
├── theme_blue.less
├── _vars.less
└── _button.less



```


```js
$wb().entries(['./src/less/**/!(_*).less']).output().less().done()

// this config entry will be 
{
  'app':'./src/less/app.less',
  'theme_pink':'./src/less/theme_pink.less',
  'theme_blue':'./src/less/theme_pink.less',
}
// ./src/less will be base dir ,and entry name will be file's path
```
