<template>
  <div>
    <img :src="tag" alt="">
  </div>
</template>

<script>
import test1 from './assets/test.png'
import font from './assets/test.ttf'
import tag from './assets/tag-gong.png'
console.log(tag)
export default {
  data(){
    return {
      tag
    }
  }
}
</script>

<style lang='less'>
body{
  background: #000;
}
</style>
