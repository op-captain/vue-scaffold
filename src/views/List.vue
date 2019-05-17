<template>
  <scroll-view
    ref="scrollWrapper"
    :downTipIsShow="downTipIsShow"
    :upTipIsShow="upTipIsShow"
    @refreshScroll="refreshScroll"
    @loadMoreScroll="loadMoreScroll"
  >
    <ul class="list-content">
      <li data-tag-type="parentEle" v-for="(item,index) in list" :data-id="item.id" :key="item.id+index" @click="goDetail">
        <div class="list-title" >{{item.title}}</div>
        <div class="list-date">{{item.datetime | datetimeToDate}}</div>
        <ul class="nine-gridview clear-fix list-image">
          <li data-type="preview" class="childImgItem"
            :data-parent-id="item.id"
            v-for="(imgItem,indexChild) in item.image"
            :key="indexChild"
          >
            <img data-type="preview" :data-parent-id="item.id" :src="imgItem.url" alt>
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
  mixins: [pageList],//分页的列表页
  mounted() {},
  created() {
    //初始化列表数据
    this.initList().then(() => {
      
      this.$nextTick(() => {
        //初始化scrollview
        this.$refs.scrollWrapper.initScroll();
        //绑定iscrollView的tap事件
        $(".list-content").on("scrollViewTap", (e)=>{
          let type = $(e.target).data('type')

          //需要预览的图片
          if(type === "preview"){
            this.preview(e)
          }else{ //进入详情
            this.goDetail(e)
          }
          
        });
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
    //获取数据方法 该方法需要重写 mixin中的方法
    loadData(type) {
      //更新数据的类型，不同类型用不同方式处理
      type = type || "more";

      //获取参数
      let params = this.getParams();

      //调用数据接口
      return api.articleList(params).then(data => {
        //总条数 计算总页面
        this.total = data.data.total;

        //更新数据 渲染视图
        this.updateList(data.data.articleList, type);

        //控制scrollVeiw 顶部和底部的提示DOM 大于一页才显示 上拉，下拉的提示结构
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
    //滑动到底部的加载更多的事件处理方法
    loadMoreScroll() {
      this.loadMore().then(() => {
        this.$nextTick(() => {
          this.$refs.scrollWrapper.reFreshScroll();
        });
      });
    },
    //下拉刷新事件的处理方法
    refreshScroll() {
      this.refreshList().then(() => {
        this.$nextTick(() => {
          this.$refs.scrollWrapper.reFreshScroll();

          //刷新列表数据重置为最新的第一页数据，所以要重置是否源发事件的 状态数据
          this.$refs.scrollWrapper.resetLoadMoreScrollSend();
        });
      });
    },
    //预览图的事件处理方法
    preview(e) {
      let itemIdx,
        imgList = [],
        parentId;

      e.stopPropagation();
      parentId = $(e.target).data("parentId");

      if(e.target.tagName === "IMG"){
        itemIdx = $(e.target).parent().index()
      }else{
        itemIdx = $(e.target).index()
      }
      
    
      //获得组件预览数据
      imgList = _.find(this.list, { id: _.toString(parentId) }).image;

      imgList = imgList.map(item => {
        return item.url;
      });
      console.log(imgList);

      //更新数据，显示组件预览
      this.$refs.preview.update(imgList, itemIdx).show();
    },
    goDetail(e) {
      let id;
      let tagType = $(e.target).data('tagType')

      console.log(e.target)

      if(tagType === "parentEle"){
        id = $(e.target).data("id")
      }else{
        id = $(e.target).parent().data("id")
      }
      

      let itemData = _.find(this.list, { id })

      this.$router.push({
        name: "detail",
        params: {
          id,
          meta: {
            title: "详情页" + itemData.title
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list-image {
  width: 70%;
}
.list-title {
  height: 40px;
  line-height: 40px;
  background:#ccc;
  text-align: left;
}
</style>
