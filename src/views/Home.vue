<template>
  <div class="home">
    <cube-scroll ref="scroll">
      <img alt="Vue logo" :src="logo">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </cube-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
    return {
      logo:require('../assets/images/logo.png')
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/variables.less');

.home{
  .mixin-class-scrollWrap;
}


</style>

