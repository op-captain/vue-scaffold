<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <cube-button @click="showDialog">show dialog</cube-button>
    <cube-loading v-if="loading"></cube-loading>
    <bottom-tab-navigator></bottom-tab-navigator>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data:function(){
    return {
      loading:true
    }
  },
  methods: {
      showDialog() {
        this.$createDialog({
          type: 'alert',
          title: 'Alert',
          content: 'dialog content'
        }).show()  
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
