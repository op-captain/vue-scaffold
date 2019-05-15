<template>
  <div ref="scrollWrapper" class="scroll-wrap">
    <div class="scroll-content">
      <p :class="classPullDown">{{textPullDown}}</p>
      <slot></slot>
      <p :class="classPullUp">{{textPullUp}}</p>
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
    }
  },
  data() {
    return {
      atRefreshPoint: false, //是否到达指定位置，即松手就可以执行刷新操作
      atLoadMorePoint: false, //是否到达指定位置，即松手就可以执行刷新操作
      isLoading: false, //是否正在加载数据 避免多次执行
      pullDownText: {
        default: "刷新",
        lax: "松开刷新...",
        loading: "正在刷新中……"
      },
      pullUpText: {
        default: "加载",
        lax: "松开加载...",
        loading: "正在加载中……"
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
      if (this.atRefreshPoint && this.isLoading) {
        text = this.pullDownText.loading;
      } else {
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
      if (this.atLoadMorePoint && this.isLoading) {
        text = this.pullUpText.loading;
      } else {
        text = this.atLoadMorePoint ? this.pullUpText.lax : this.pullUpText.default;
      }
      return text;
    }
  },
  methods: {
    /**
     * https://zhuanlan.zhihu.com/p/27407024
     * 插件用的iscroll 但是 better-scroll里面讲解的更清楚，可以参考：
     * scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动。
     * 因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。
     * 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。所以scroll 不能滚动的原因多半是初始化
     * scroll 的时机不对，或者是当 DOM 结构发送变化的时候并没有重新计算 scroll。
     */
    initScroll() {
      let $pullDown = $(".pullDown"),
        $pullUp = $(".pullUp");

      if (!this.$refs.scrollWrapper) {
        return;
      }

      let pullDown = 1; // 下拉刷新避免多次执行
      let pullUp = 1; // 上拉加载避免多次执行
      let downHeight = $pullDown.height();
      let upHeight = $pullUp.height();

      // scroll的初始化
      this.scroll = new IScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        fadeScrollbars: this.fadeScrollbars
      });

      this.scroll.on("scroll", () => {
        let y = this.scroll.y;

        // 下拉刷新 正在下拉中 而且 已经开始加载数据
        if (y >= downHeight && !this.isLoading) {
          this.atRefreshPoint = true;
          this.scroll.minScrollY = downHeight;
        }
        // 下拉刷新 正在下拉中 并没有加载数据
        if (y <= downHeight && y >= 0 && !this.isLoading) {
          this.atRefreshPoint = false;
          this.scroll.minScrollY = 0;
        }

        // 上拉刷新
        let maxHeight = this.scroll.maxScrollY;
        if (y < maxHeight - upHeight && pullUp) {
          $(".pullUp")
            .addClass("loading")
            .html("松开加载...");
          this.scroll.maxScrollY = maxHeight - upHeight;
          pullUp = 0;
        }
        if (y > maxHeight && y < maxHeight + upHeight && !pullUp) {
          $(".pullUp")
            .removeClass("loading")
            .html("上拉加载...");
          this.scroll.maxScrollY = maxHeight + upHeight;
          pullUp = 1;
        }
      });

      this.scroll.on("scrollEnd", () => {
        if (this.atRefreshPoint) {
          this.isLoading = true;

          //common.loadingShow();

          //   setTimeout(function() {
          //     location.reload();
          //   }, 2000);
        }
      });

      // // 是否派发滚动事件
      // if (this.listenScroll) {
      //   this.scroll.on('scroll', (pos) => {
      //     this.$emit('scroll', pos)
      //   })
      // }

      // // 是否派发滚动到底部事件，用于上拉加载
      // if (this.pullup) {
      //   this.scroll.on('scrollEnd', () => {
      //     // 滚动到底部
      //     if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //       this.$emit('scrollToEnd')
      //     }
      //   })
      // }

      // // 是否派发顶部下拉事件，用于下拉刷新
      // if (this.pulldown) {
      //   this.scroll.on('scrollEnd', (pos) => {
      //       //console.log(this.scroll)
      //     // 下拉动作
      //     if (pos.y > 50) {
      //       this.$emit('scrollPulldown')
      //     }
      //   })
      // }

      // // 是否派发列表滚动开始的事件
      // if (this.beforeScroll) {
      //   this.scroll.on('beforeScrollStart', () => {
      //     this.$emit('beforeScroll')
      //   })
      // }
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
