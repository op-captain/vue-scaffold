<template>
  <div>
    <h2>list page</h2>
    <ul>
      <li
        v-for="item in listArr"
        :data-id="item.id"
        :key="item.id"
        @click="goDetail"
      >{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
import pageList from "@/mixins/pageList";
import { find } from "lodash";

export default {
  mixins: [pageList],
  created() {
    this.initList();
  },
  data() {
    return {
      listArr: [
        { id: "1", content: "123", token: "abcd" },
        { id: "2", content: "456", token: "jklh" }
      ]
    };
  },
  methods: {
    loadData() {
      console.log("请求数据");
    },
    goDetail(e) {
      let el = event.currentTarget;
      let id = el.dataset.id;

      let itemData = find(this.listArr, { id });
      let { token } = itemData;

      this.$router.push({
        name: "detail",
        params: {
          id,
          token
        }
      });

      console.log(el);
    }
  }
};
</script>

<style>
</style>
