<template>
  <div ref="scrollWrapper" class="scroll-wrap">
    <div class="scroll-content">
      <p v-if="downTipIsShow" :class="classPullDown">{{textPullDown}}</p>
      <slot></slot>
      <p v-if="upTipIsShow" :class="classPullUp">{{textPullUp}}</p>
    </div>
  </div>
</template>
<script>
/**
 * 修改说明：
 * http://www.jq22.com/jquery-info20505
 * 发现iScroll5中当重置位置的时候，如果当前Y坐标大于0，则固定滚动回0，无法动态设置。于是简单看了下源码，修改了以下几个地方。

1. 打开iscroll-probe.js文件

2. 找到：

this.maxScrollX = this.wrapperWidth - this.scrollerWidth;  
this.maxScrollY     = this.wrapperHeight - this.scrollerHeight;
更改为：

this.minScrollX     = 0;  
this.minScrollY     = 0;  
this.maxScrollX     = this.wrapperWidth - this.scrollerWidth;  
this.maxScrollY     = this.wrapperHeight - this.scrollerHeight;

3. 找到：

if ( !this.hasHorizontalScroll || this.x > 0 ) {  
   x = 0;
} else if ( this.x < this.maxScrollX ) {
   x = this.maxScrollX;
}
if ( !this.hasVerticalScroll || this.y > 0 ) {  
   y = 0;
} else if ( this.y < this.maxScrollY ) {
   y = this.maxScrollY;
}
更改为：

if ( !this.hasHorizontalScroll || this.x > 0 ) {  
   x = this.minScrollX;
} else if ( this.x < this.maxScrollX ) {
   x = this.maxScrollX;
}
if ( !this.hasVerticalScroll || this.y > 0 ) {  
   y = this.minScrollY;
} else if ( this.y < this.maxScrollY ) {
   y = this.maxScrollY;
}
 */
import "../../utils/lib/iscroll-probe";
import $ from "jquery";
import _ from "lodash";
import { setTimeout } from "timers";

export default {
  props: {
    probeType: {
      type: Number,
      default: 2
    },
    fadeScrollbars: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 数据较少时，需要隐藏
     */
    upTipIsShow: {
      type: Boolean,
      default: true
    },
    /**
     * 数据较少时，需要隐藏
     */
    downTipIsShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      atRefreshPoint: false, //是否到达指定位置，即松手就可以执行刷新操作
      atLoadMorePoint: false, //是否到达指定位置，即松手就可以执行刷新操作
      isLoading: false, //是否正在加载数据 避免多次执行
      allComplete: false, //是否全部加载完成
      pullDownText: {
        default: "刷新",
        lax: "松开刷新...",
        loading: "正在刷新中……"
      },
      pullUpText: {
        default: "更多",
        lax: "松开加载...",
        loading: "正在加载中……",
        allComplete: "已全部加载完"
      }
    };
  },
  computed: {
    /**
     * 刷新样式
     */
    classPullDown() {
      return {
        tip: true,
        pullDown: true
      };
    },
    /**
     * 加载样式
     */
    classPullUp() {
      return {
        tip: true,
        pullUp: true
      };
    },
    /**
     * 刷新提示文字
     */
    textPullDown() {
      let text;
      //正在加载数据
      if (this.atRefreshPoint && this.isLoading) {
        text = this.pullDownText.loading;
      } else { //根据位置的拉动提示
        text = this.atRefreshPoint
          ? this.pullDownText.lax
          : this.pullDownText.default;
      }
      return text;
    },
    /**
     * 加载提示文字
     */
    textPullUp() {
      let text;
      //全部数据加载完成
      if (this.allComplete) {
        text = this.pullUpText.allComplete;
      } else if (this.atLoadMorePoint && this.isLoading) { //正在加载数据
        text = this.pullUpText.loading;
      } else { //根据位置的拉动提示
        text = this.atLoadMorePoint
          ? this.pullUpText.lax
          : this.pullUpText.default;
      }
      return text;
    }
  },
  methods: {
    /**
     * https://zhuanlan.zhihu.com/p/27407024
     * 插件用的iscroll 但是 better-scroll文档里面讲解的更清楚，可以参考：
     * scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动。
     * 因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。
     * 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。所以scroll 不能滚动的原因多半是初始化
     * scroll 的时机不对，或者是当 DOM 结构发送变化的时候并没有重新计算 scroll。
     */
    initScroll() {
      let $pullDown = $(".pullDown"),
        $pullUp = $(".pullUp");

      let downHeight = $pullDown.height(),
        upHeight = $pullUp.height();

      if (!this.$refs.scrollWrapper) {
        return;
      }

      // scroll的初始化
      this.scroll = new IScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        fadeScrollbars: this.fadeScrollbars
      });

      this.scroll.on("scroll", () => {
        let y = this.scroll.y;
        let maxHeight = this.scroll.maxScrollY;

        // 下拉刷新 正在下拉中 而且 松开手指会开始加载数据
        if (y >= downHeight && !this.isLoading) {
          this.atRefreshPoint = true
          this.isLoading = true
          this.scroll.minScrollY = downHeight;
        }
        // 下拉刷新 正在下拉中 松开手指不会加载数据
        if (y <= downHeight && y >= 0 && this.isLoading) {
          this.atRefreshPoint = false
          this.isLoading = false
          this.scroll.minScrollY = 0;
        }

        // 上拉加载更多 正在上拉中 而且 松开手指会开始加载数据
        if (y < maxHeight - upHeight && !this.isLoading) {
          this.atLoadMorePoint = true
          this.isLoading = true

          //无需加载数据了，所以不用停在有显示提示dom的位置
          this.scroll.maxScrollY = maxHeight - upHeight;

        }
        // 上拉加载更多 正在上拉中 而且 松开手指会不会加载数据
        if (y > maxHeight && y < (maxHeight + upHeight) && this.isLoading) {
          this.atLoadMorePoint = false;
          this.isLoading = false;
          this.scroll.maxScrollY = maxHeight + upHeight;
        }
      });

      this.scroll.on("scrollEnd", () => {
        //发送下拉刷新派发
        if (this.atRefreshPoint && this.isLoading) {
          this.$emit("refreshScroll");
        }
        //发送上拉加载更多派发
        if (this.atLoadMorePoint && this.isLoading && !this.allComplete) {
          this.$emit("loadMoreScroll");
        }
      });
    },
    //刷新
    reFreshScroll() {
      setTimeout(() => {
        this.scroll.refresh();
        this.isLoading = false;
        this.atLoadMorePoint = false;
        this.atRefreshPoint = false;
      }, 20);
    },
    //不再派发[加载更多]的事件
    closeLoadMoreScrollSend() {
      this.allComplete = true;
    },
    resetLoadMoreScrollSend() {
      this.allComplete = false;
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: absolute;
  top: 73px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  background: #3e3e3e;
  .scroll-content {
    background: #fff;
    .pullDown {
      position: absolute;
      top: -1.25rem;
      left: 0;
      width: 100%;
    }
    .pullUp {
      position: absolute;
      bottom: -1.25rem;
      left: 0;
      width: 100%;
      z-index: 100;
    }
    .tip {
      color: #fff;
      text-align: center;
      font-size: 0.40625rem;
      line-height: 1.25rem;
    }
  }
}
</style>
