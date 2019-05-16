<template>
  <scroll-view
    ref="scrollWrapper"
    :downTipIsShow="downTipIsShow"
    :upTipIsShow="upTipIsShow"
    @refreshScroll="refreshScroll"
    @loadMoreScroll="loadMoreScroll"
  >
    <ul class="list-content">
      <li v-for="(item,index) in list" :data-id="item.id" :key="item.id+index" @click="goDetail">
        <div class="list-title">{{item.title}}</div>
        <div class="list-date">{{item.datetime | datetimeToDate}}</div>
        <ul class="nine-gridview clear-fix list-image">
          <li
            @click.stop="preview"
            :data-parent-id="item.id"
            v-for="(imgItem,indexChild) in item.image"
            :key="indexChild"
          >
            <img :src="imgItem.url" alt>
          </li>
        </ul>
      </li>
    </ul>
    <preview-image ref="preview"></preview-image>
  </scroll-view>
</template>

<script>
import pageList from "@/mixins/pageList";
import api from "../api/index";
import $ from "jquery";
import _ from "lodash";
import { setTimeout } from "timers";

export default {
  mixins: [pageList],
  mounted() {},
  created() {
    //初始化列表数据
    this.initList().then(() => {
      //初始化scrollview
      this.$nextTick(() => {
        this.$refs.scrollWrapper.initScroll();
      });
    });
  },
  data() {
    return {
      downTipIsShow: true, //是否显示下拉的提示文字
      upTipIsShow: true //是否显示上拉的提示文字
    };
  },
  methods: {
    loadData(type) {
      type = type || 'more'
      //获取参数
      let params = this.getParams();
      //调用数据接口
      return api.articleList(params).then(data => {
        //总条数 计算总页面
        this.total = data.data.total;

        //更新数据
        this.updateList(data.data.articleList,type);

        //大于一页才显示 上拉，下拉的提示结构
        if (this.totalPage > 1) {
          this.downTipIsShow = true;
          this.upTipIsShow = true;
        } else {
          this.upTipIsShow = false;
        }

        //已经加载过最后一页数据了，没有更多数据
        if (this.totalPage === this.page) {
          this.$refs.scrollWrapper.closeLoadMoreScrollSend();
        }
      });
    },
    loadMoreScroll() {
      this.loadMore().then(() => {
        this.$nextTick(() => {
          this.$refs.scrollWrapper.reFreshScroll();
        });
      });
    },
    refreshScroll() {
      this.refreshList().then(() => {
        this.$nextTick(() => {
          this.$refs.scrollWrapper.reFreshScroll();
          //刷新列表数据重置为最新的第一页数据，所以要重置是否源发事件的 状态数据
          this.$refs.scrollWrapper.resetLoadMoreScrollSend()
        });
      });
    },
    preview(e) {
      // let itemIdx,
      //     imgList=[],
      //     parentId;
      // itemIdx = $(e.currentTarget).index()
      // parentId = $(e.currentTarget).data('parentId')
      // imgList = _.find(this.listArr,{"id":_.toString(parentId)}).url
      //this.$refs.preview.update(imgList,itemIdx)
    },
    goDetail(e) {
      // let el = event.currentTarget;
      // let id = el.dataset.id;
      // let itemData = _.find(this.listArr, { id });
      // let { token } = itemData;
      // this.$router.push({
      //   name: "detail",
      //   params: {
      //     id,
      //     token,
      //     meta: {
      //       title: "详情页" + itemData.content
      //     }
      //   }
      // });
      // console.log(el);
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
