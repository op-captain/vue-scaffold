<template>
  <div>
    <ul>
      <li v-for="(item,index) in listArr" :data-id="item.id" :key="item.id+index" @click="goDetail">
        <div class="list-title">{{item.content}}</div>
        <ul class="nine-gridview clear-fix list-image">
          <li @click.stop="preview" :data-parent-id="item.id" v-for="(imgUrl,indexChild) in item.url" :key="indexChild">
            <img :src="imgUrl" alt >
          </li>
        </ul>
      </li>
    </ul>
    <preview-image ref="preview"></preview-image>
  </div>
</template>

<script>
import pageList from "@/mixins/pageList";
import $ from 'jquery'
import _ from "lodash";

export default {
  mixins: [pageList],
  created() {
    this.initList();
  },
  data() {
    return {
      listArr: [
        {
          id: "1001",
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
          id: "1002",
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
    preview(e){
      let itemIdx,
          imgList=[],
          parentId;

      itemIdx = $(e.currentTarget).index()
      parentId = $(e.currentTarget).data('parentId')
      imgList = _.find(this.listArr,{"id":_.toString(parentId)}).url

      this.$refs.preview.update(imgList,itemIdx)
    },
    goDetail(e) {
      let el = event.currentTarget;
      let id = el.dataset.id;

      let itemData = _.find(this.listArr, { id });
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
