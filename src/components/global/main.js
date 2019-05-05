
// components/index.js
import Vue from 'vue'

//cube-ui 第三方UI组件库 按需引入组件
import './cubeUi'

// 获取组件目录下符合 一定 正则表达式的 组件
const requireFn = require.context('./', true, /\.vue/);

// 获取上下文下的 所有组件
const componentsPathArray = requireFn.keys();

// 组件名称首字母大写
const componentsNameArray = componentsPathArray.map((item) => {
    return item.match(/\.\/(\w+)\.vue/)[1];
});

// 全局注册组件，此处可以使用 Vue.options.components 查看全局注册的组件
componentsPathArray.forEach((item, index) => {
    Vue.component(componentsNameArray[index], requireFn(item).default);
});