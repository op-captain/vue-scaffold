<template>
  <div class="scroll-list-wrap">
    <cube-scroll ref="scroll">
      <h2>{{detail.title}}</h2>
      <div>{{detail.datetime}}</div>
      <p>{{detail.content}}</p>
      <ul>
        <li v-for="(item,index) in detail.image" :key="index">
          <img @load="onImgLoad" :src="item" alt>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import api from "../api/index";

export default {
  mounted() {
    console.log(this.$route.params);

    let { id } = this.$route.params;

    this.loadDetail(id);
  },
  data() {
    return {
      detail: []
    };
  },
  methods: {
    loadDetail(id) {
      let par = {
        id
      };
      api.articleDetail(par).then(data => {
        this.detail = data.data
      });
    },
    onImgLoad(){
      
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../assets/variables.less');

.scroll-list-wrap {
  position: absolute;
  top:@absoultTop;
  bottom:0;
  overflow: hidden;
}
h2 {
  font-size: 20px;
  margin: 15px 0;
}
li {
  width: 300px;
  min-height: 180px;
  img {
    width: 100%;
  }
}
</style>

