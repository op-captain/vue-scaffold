<template>
  <div>
    <div class="swiper-container-preview" id="origin-img" v-show="isShow">
      <div class="swiper-wrapper"></div>
      <div class="swiper-pagination"></div>
      <div class="img-info">xxx上传于2018-06-17</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      classNameWrap: ".swiper-container-preview",
      classNamePagination: ".swiper-pagination",
      idWrap: "#origin-img",
      swiper: null,
      isShow: false
    };
  },
  mounted() {
    console.log(this.isShow);
    this.create();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    create() {
      let that = this;

      document.body.appendChild(this.$el);

      //实例swiper
      this.swiper = new Swiper(this.classNameWrap, {
        zoom: true, //焦距功能：双击slide会放大，并且在手机端可双指触摸缩放  https://3.swiper.com.cn/api/zoom/2016/1029/311.html
        width: window.innerWidth,
        toggle: false, //设置为false，不允许双击缩放，只允许手机端触摸缩放。 https://www.swiper.com.cn/api/zoom/314.html
        virtual: true, //开启虚拟Slide功能 https://www.swiper.com.cn/api/virtual/374.html
        spaceBetween: 20,
        pagination: {
          el: this.classNamePagination,
          type: "fraction"
        },
        on: {
          click: function() {
            $(that.idWrap).fadeOut("fast");
            this.virtual.slides.length = 0;
            this.virtual.cache = [];
            this.virtual.update();
          }
        }
      });
    },
    destroy() {
      $(this.$el).remove();
      this.swiper.destroy();
    },
    update(sliders, itemIdx) {
      sliders.forEach(o => {
        this.swiper.virtual.appendSlide(
          '<div class="swiper-zoom-container"><img src="' + o + '" /></div>'
        );
      });
      this.swiper.slideTo(itemIdx,0);
      this.swiper.virtual.update();
      return this;
    },
    show(){
      $(this.idWrap).fadeIn("fast");
      this.isShow = true;
    }
  }
};
</script>


<style lang="less">
@fs12:12px;
@fs14:14px;
/*swiper 预览图样式*/
#origin-img {
    display: block;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    .swiper-slide {
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
    .swiper-pagination {
        font-size: @fs12;
        top: 0.4324rem;
        bottom: auto;
        color: #fff;
    }
    .img-info {
        position: absolute;
        font-size: @fs14;
        bottom: 0.2703rem;
        line-height: @fs12;
        background: rgba(0, 0, 0, .5);
        z-index: 1;
        color: #fff;
        text-indent: @fs12;
        width: 100%;
    }
}
</style>
