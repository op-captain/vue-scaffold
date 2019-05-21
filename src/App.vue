<template>
  <div id="app">
    <nav-top 
    :title="title" 
    :back="backIsShow"/>
    <router-view/>
    <div id="tabBottom">
      <cube-tab-bar
        v-if="tabBarIsShow"
        v-model="activeLabel"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler"
      ></cube-tab-bar>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  computed: {
    tabBarIsShow() {
      return this.$store.state.tabBarBottom.isShow; //底部tabBar是否显示
    },
    activeLabel: { //底部tabBar
      get() {
        return this.$store.state.tabBarBottom.selectedLabel;
      },
      set() {}
    },
    title(){ //顶部 标题
      return this.$store.state.navTop.title
    },
    backIsShow(){ //顶部 后退
      return this.$store.state.navTop.back
    }
  },
  data() {
    return {
      tabs: this.$store.state.tabBarBottom.tabs
    };
  },
  methods: {
    clickHandler() {},
    changeHandler(label) {
      let { path } = _.find(this.$store.state.tabBarBottom.tabs, { label });

      this.$router.push({ path, query: { userId: "123" } });
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #tabBottom {
    border-top: 1px solid #ccc;
    background: #fff;
    position: fixed;
    z-index: 2;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
