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
//验证规则
import './utils/validatorRules'
//全局样式
import './assets/common.less'
//全局指令
import './directive/index'
//全局过滤器
import './filter/index'

//修复移动 :active 样式无效的问题。例如 button 需要这个样式
// document.body.addEventListener('touchstart', (e)=>{});

//阻止页面整个被拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); 
}, {passive: false});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
