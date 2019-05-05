
/**
 * cube-ui 第三方UI组件库 按需引入组件
 * 需要使用Vue.use方法才能使用
 * 官方说明：https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start
 */
import Vue from 'vue';
import {
    Style,
    Dialog,
    Button,
    Loading,
} from 'cube-ui';

var componentNames = [
    Style,
    Dialog,
    Button,
    Loading
]

componentNames.forEach(name => {
    Vue.use(name)
})





