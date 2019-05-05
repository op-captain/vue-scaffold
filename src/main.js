import Vue from 'vue'
//组件入口
import App from './App.vue'
//路由
import router from './router'
//vuex状态管理
import store from './store'
//rem布局
import 'amfe-flexible'
//全局组件
import './components/global/main'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
