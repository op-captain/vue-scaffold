<template>
  <div>
    <ul>
      <li v-for="(item,index) in listArr" :data-id="item.id" :key="item.id+index" @click="goDetail">
        <div class="list-title">{{item.content}}</div>
        <ul v-swiper-image-view class="nine-gridview clear-fix list-image">
          <li v-for="(imgUrl,indexChild) in item.url" :key="indexChild">
            <img :src="imgUrl" alt >
          </li>
        </ul>
      </li>
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
        {
          id: "1",
          content: "123",
          token: "abcd",
          url: [
            require("../assets/images/test1.jpg"),
            require("../assets/images/test2.jpg"),
            require("../assets/images/test3.jpg"),
            require("../assets/images/test4.jpg"),
            require("../assets/images/test5.jpg")
          ]
        },
        {
          id: "2",
          content: "456",
          token: "edfg",
          url: [require("../assets/images/test1.jpg")]
        }
      ]
    };
  },
  methods: {
    loadData() {
      console.log("请求数据");
    },
    imgView(e){
      
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
          token,
          meta: {
            title: "详情页" + itemData.content
          }
        }
      });

      console.log(el);
    }
  }
};
</script>

<style lang="less" scoped>
.list-image {
  width: 70%;
}
.list-title {
  text-align: left;
}
</style>
