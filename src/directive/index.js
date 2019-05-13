import Vue from 'vue'
import $ from 'jquery'
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

//查看大图
Vue.directive('swiper-image-view', {
    bind(el) {
        let template = `
            <div class="swiper-container" id="origin-img">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
                <div class="img-info">xxx上传于2018-06-17</div>
            </div>`
        //插件预览dome结构
        if (!$('#origin-img').length) {
            $('body').append(template)
        }
        //阻止冒泡
        $(el).children().on('click', (e) => {
            e.stopPropagation()
        })

        var swiper = new Swiper('.swiper-container', {
            zoom: true, //焦距功能：双击slide会放大，并且在手机端可双指触摸缩放  https://3.swiper.com.cn/api/zoom/2016/1029/311.html
            width: window.innerWidth,
            toggle:false, //设置为false，不允许双击缩放，只允许手机端触摸缩放。 https://www.swiper.com.cn/api/zoom/314.html
            virtual: true, //开启虚拟Slide功能 https://www.swiper.com.cn/api/virtual/374.html
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            on: {
                click: function () {
                    $('#origin-img').fadeOut('fast');
                    this.virtual.slides.length = 0;
                    this.virtual.cache = [];
                    swiperStatus = false;
                },
            },

        });
    },
    inserted(el) {


    }
})
