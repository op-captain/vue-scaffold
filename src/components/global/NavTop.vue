<template>
  <div class="nav-top">
    <div class="left" >
      <span class="back-wrap" v-if="back" @click="backHandler"><i class="cubeic-back"></i></span>
    </div>
    <div class="center">
      <span>{{title}}</span>
    </div>
    <div class="right">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        back:{
            default:false,
            type:Boolean
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        backHandler(){
          this.$router.go(-1)
        }
    }
}
</script>

<style lang='less' scoped>
.nav-top {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 40px;
  background: red;
  color: #fff;
  .left {
      display: flex;
      justify-content: center;
      align-items: center;
    height: 40px;
    width: 40px;
    .back-wrap{
      display: block;
      padding: 14px;
    }
  }
  .right {
    height: 40px;
    width: 40px;
  }
  .center{
      flex: 1;
      width: 100%;
      line-height: 40px;
      height: 40px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis ;
  }
}
</style>
