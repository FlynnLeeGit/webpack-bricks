<template>
  <div>
    HELLO
    <img :src="tag" alt="">
    <div class="test">
      <div class="test-2">
        test2
      </div>
    </div>
  </div>
</template>

<script>
import test1 from './assets/test.png'
import font from './assets/test.ttf'
import tag from './assets/tag-gong.png'
import forEach from 'lodash/forEach'
forEach({a:1,b:2},(item)=>{
  console.log(item)
})
export default {
  data(){
    return {
      tag
    }
  }
}
</script>

<style>
.test{
}
</style>
