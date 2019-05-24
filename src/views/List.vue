<template>
  <div class="scroll-wrap">
    <cube-scroll ref="scroll"
    :data="list"
    :options="options"
    @pulling-down="onPullingDown" 
    @pulling-up="onPullingUp">
      <ul class="list-content">
        <li
          v-for="(item,index) in list"
          :data-id="item.id"
          :key="item.id+index"
        >
          <div @click="goDetail" class="list-title">{{item.title}}</div>
          <div class="list-date">{{item.datetime | datetimeToDate}}</div>
          <ul class="nine-gridview clear-fix list-image">
            <li
              class="childImgItem"
              :data-parent-id="item.id"
              v-for="(imgItem,indexChild) in item.image"
              :key="indexChild"
              :data-index="indexChild"
              @click="preview"
            >
              <img @load="onImgLoad" data-type="preview" :data-parent-id="item.id" :src="imgItem.url" alt>
            </li>
          </ul>
        </li>
      </ul>
      <template slot="pulldown" slot-scope="props">
        <div
          v-if="props.pullDownRefresh"
          class="cube-pulldown-wrapper"
          :style="props.pullDownStyle"
        >
          <div
            v-if="props.beforePullDown"
            class="before-trigger"
            :style="{paddingTop: props.bubbleY + 'px'}"
          >
            <span :class="{rotate: props.bubbleY > options.pullDownRefresh.threshold - 60}">↓</span>
          </div>
          <div class="after-trigger" v-else>
            <div v-show="props.isPullingDown" class="loading">
              <cube-loading></cube-loading>
            </div>
            <transition name="success">
              <div v-show="!props.isPullingDown" class="text-wrapper">
                <span class="refresh-text">成功更新！</span>
              </div>
            </transition>
          </div>
        </div>
      </template>
    </cube-scroll>
    <preview-image ref="preview"></preview-image>
  </div>
</template>

<script>
import pageList from "@/mixins/pageList";
import api from "../api/index";
import $ from "jquery";
import _ from "lodash";

export default {
  mixins: [pageList], //分页的列表页
  mounted() {},
  created() {
    console.log(this.$route.query);
    //初始化列表数据
    this.initList().then(() => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    });
  },
  data() {
    return {
      options: { //滚动组件配置项 https://didi.github.io/cube-ui/#/zh-CN/docs/scroll#cube-%E6%8F%92%E6%A7%BD-anchor
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: {
          txt:{
            more:"加载更多",
            noMore:"没有更多数据了"
          }
            
        }
      },
      secondStop:26
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

      });
    },
    //下拉刷新
    onPullingDown(){
      //已经加载过最后一页数据了，没有更多数据
      if (this.totalPage === this.page) {
        this.$refs.scroll.resetPullUpTxt()
      }
      this.refreshList()
    },
    //上拉加载
    onPullingUp(){
        //已经加载过最后一页数据了，没有更多数据
        if (this.totalPage === this.page) {
          this.$refs.scroll.forceUpdate()
        }else{
          this.loadMoreScroll()
        }
    },
    //图片加载完成
    onImgLoad() {
      try{
        const scroll = this.$refs.scroll
        scroll.scroll.beforePullDown && scroll.refresh()
      }catch(e){
        console.log(e)
      }
    },
    //滑动到底部的加载更多的事件处理方法
    loadMoreScroll() {
      this.loadMore().then(() => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
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

      //获得组件预览数据
      imgList = _.find(this.list, { id: _.toString(parentId) }).image;

      imgList = imgList.map(item => {
        return item.url;
      });

      itemIdx = $(e.target)
        .parent()
        .data("index");
      console.log(imgList);

      //更新数据，显示组件预览
      this.$refs.preview.update(imgList, itemIdx).show();
    },
    //详情页
    goDetail(e) {
      let id;

      console.log(e.target);
      id = $(e.target).parent().data("id");
      
      let itemData = _.find(this.list, { id });

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
@import url("../assets/variables.less");

.scroll-wrap {
  position: absolute;
  width: 100%;
  top: @absoultTop;
  bottom: @absoultTop;
  overflow: hidden;
  .cube-pulldown-wrapper {
    text-align: center;
    .before-trigger {
      height: auto;
      font-size: 30px;
      align-self: flex-end;
      span {
        display: inline-block;
        line-height: 1;
        transition: all 0.3s;
        color: #666;
        padding: 15px 0;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
    .after-trigger {
      flex: 1;
      margin: 0;
      .loading{
        width: 0.64rem;
        margin: 0 auto;
      }
      .text-wrapper {
        margin: 0 auto;
        margin-top: 14px;
        padding: 5px 0;
        color: #498ec2;
        background-color: #d6eaf8;
      }

      .cube-loading-spinners {
        margin: auto;
      }
    }
  }
  .success-enter-active,
  .success-leave-active {
    transition: width 0.5s;
  }

  .success-enter,
  .success-leave-to {
    width: 70%;
  }

  .success-enter-to,
  .success-leave {
    width: 100%;
  }
}

.list-image {
  width: 70%;
}
.list-title {
  height: 40px;
  line-height: 40px;
  background: #ccc;
  text-align: left;
}
</style>
