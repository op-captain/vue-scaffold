import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = []

// 获取组件目录下符合 一定 正则表达式的 组件
const routersContext = require.context('./', true, /index\.js$/)

// 获取上下文下的 所有组件
const routersArray = routersContext.keys()

routersArray.forEach((route, index) => {
    if(route.startsWith('./index')){
        return
    }

    const routerModule = routersContext(route)

    routes = [...routes,...(routerModule.default || routerModule)]
})

export default new Router({
    routes
})

