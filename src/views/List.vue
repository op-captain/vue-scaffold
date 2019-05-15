<template>
    <scroll-view 
      ref="scrollWrapper"
      @scrollToEnd="scrollToEnd"
      @scrollPulldown ="scrollPulldown"
    >
      <ul class="list-content">
        <li v-for="(item,index) in list" :data-id="item.id" :key="item.id+index" @click="goDetail">
          <div class="list-title">{{item.title}}</div>
          <div class="list-date">{{item.datetime | datetimeToDate}}</div>
          <ul class="nine-gridview clear-fix list-image">
            <li @click.stop="preview" :data-parent-id="item.id" v-for="(imgItem,indexChild) in item.image" :key="indexChild">
              <img :src="imgItem.url" alt >
            </li>
          </ul>
        </li>
      </ul>
      <preview-image ref="preview"></preview-image>
    </scroll-view>
</template>

<script>
import pageList from "@/mixins/pageList"
import api from '../api/index'
import $ from 'jquery'
import _ from "lodash"

export default {
  mixins: [pageList],
  mounted(){
    
  },
  created() {
    //初始化列表数据
    this.initList().then(()=>{
      //初始化scrollview
      this.$nextTick(()=>{
        this.$refs.scrollWrapper.initScroll()
      })
    })
  },
  data() {
    return {

    }
  },
  methods: {
    loadData() {
      //获取参数
      let params = this.getParams();
      //调用数据接口
      return api.articleList(params).then((data)=>{
        //总条数 计算总页面
        this.total = data.data.total;
        //更新数据
        this.updateList(data.data.articleList)
      })
    },
    scrollToEnd(){
      console.log('上拉加载')
    },
    scrollPulldown(){
      console.log('下拉刷新')
    },
    preview(e){
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
