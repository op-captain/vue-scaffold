<template>
  <div>
    <h2>{{detail.title}}</h2>
    <div>{{detail.datetime}}</div>
    <p>{{detail.content}}</p>
    <ul>
      <li v-for="(item,index) in detail.image" :key="index">
        <img src="../assets/images/test1.jpg" alt>
      </li>
    </ul>
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
      detail: {}
    };
  },
  methods: {
    loadDetail(id) {
      let par = {
        id
      };
      api.articleDetail(par).then(data => {
        this.detail = data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
h2{
    font-size: 20px;
    margin:15px 0;
}
li {
  width: 300px;

  img {
    width: 100%;
  }
}
</style>

