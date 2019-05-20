import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/utils/localStorage'
import _ from 'lodash'
import api from '@/api/index'



//实例router
let VueRouter

let routes = []

//处理路由模块
function formRouter() {

    // 获取组件目录下符合 一定 正则表达式的 组件
    const routersContext = require.context('./', true, /.js$/)

    // 获取上下文下的 所有组件
    const routersArray = routersContext.keys()

    //合并各模块的路由
    routersArray.forEach((route, index) => {
        if (route.startsWith('./index')) {
            return
        }

        const routerModule = routersContext(route)

        routes = [...routes, ...(routerModule.default || routerModule)]
    })
}

//登录处理
function loginVilable(to, from, next) {
    let storeState = VueRouter.app.$options.store.state,
        token = storage.getLocalStorage('token');

    if (to.path === '/login') {
        next()
    } else {
        //已验证登录成功
        if (storeState.auth.login && token) {
            next()
        } else {
            /**
             * 验证登录 1. 登录时效过期 或 末登录过 2.成功登录且在时效内 
             */

            //没有成功登录
            if (!token) {

                next({
                    path: '/login',
                    query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
                })


            } else {
                //验证token
                () => {
                    //……
                }

                //调用后台登录接口 实现自动登录
                VueRouter.app.$options.store.dispatch('Login', { username: "zz", password: "123" }).then((data) => {
                    next()
                    console.log(data)
                })
            }
        }
    }
}

//页面标题处理
function documentTitle(to, from, next) {
    /* 路由发生变化修改页面title */
    let title = to.params.meta && to.params.meta.title || to.meta.title;
    if (title) {
        document.title = title
    }
}

//底部tabBar
function tabBarBottom(to, from, next) {
    if (to.path === '/' || to.path === '/list' || to.path === '/my') {
        let label = _.find(VueRouter.app.$options.store.state.tabBarBottom.tabs, { path: to.path }).label
        
        VueRouter.app.$options.store.commit('TabBarBottomDisplay', true)
        VueRouter.app.$options.store.commit('TabBarBottomSelectedLabel', label)
    } else {
        VueRouter.app.$options.store.commit('TabBarBottomDisplay', false)
    }
}

//顶部navTop
function navTop(to, from, next) {
    let backIs = true;
    
    if(to.path === '/' ){
        backIs = false
    }
    VueRouter.app.$options.store.commit('navTopBackDisplay', backIs)
    VueRouter.app.$options.store.commit('navTopTitle', to.meta.title)

}

Vue.use(Router)

formRouter()


//实例router
VueRouter = new Router({
    routes
})

//拦截路由
VueRouter.beforeEach(function (to, from, next) {
    //页面标题处理
    documentTitle(to, from, next)

    //底部tabBar
    tabBarBottom(to, from, next)

    //顶部
    navTop(to, from, next)

    //登录处理
    loginVilable(to, from, next)


})

export default VueRouter