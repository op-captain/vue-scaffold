import Vue from 'vue'
//组件入口
import App from './App.vue'
//路由
import router from './router/index'
//vuex状态管理
import store from './store/index'
//rem布局
import 'amfe-flexible'
//全局组件
import './components/global'
//全局样式
import './assets/common.less'
//全局指令
import './directive/index'
//全局过滤器
import './filter/index'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
