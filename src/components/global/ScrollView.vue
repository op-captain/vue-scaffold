<template>
  <div ref="scrollWrapper" class="scroll-wrap">
    <div class="scroll-content">
      <p class="tip pullDown">下拉刷新...</p>
      <slot></slot>
      <p class="tip pullUp">上拉加载...</p>
    </div>
  </div>
</template>

<script>
import "../../utils/lib/iscroll-probe";
import $ from "jquery";

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
      if (!this.$refs.scrollWrapper) {
        return;
      }

      let pullDown = 1; // 下拉刷新避免多次执行
      let pullUp = 1; // 上拉加载避免多次执行
      let downHeight = $(".pullDown").height();
      let upHeight = $(".pullUp").height();

      // scroll的初始化
      this.scroll = new IScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        fadeScrollbars: this.fadeScrollbars
      });

      this.scroll.on("scroll", pos => {
        let y = this.scroll.y;

        // 下拉加载
        if (y >= downHeight && pullDown) {
          $(".pullDown")
            .addClass("refresh")
            .html("松开刷新...");
          this.scroll.minScrollY = downHeight;
          pullDown = 0;
        }
        if (y <= downHeight && y >= 0 && !pullDown) {
          $(".pullDown")
            .removeClass("refresh")
            .html("下拉刷新...");
          pullDown = 1;
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

      this.scroll.on("scrollEnd", () => {});

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
