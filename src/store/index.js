import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
import storage from '../utils/localStorage'

Vue.use(Vuex)

//对应 mutations actions里面的方法
const types = {
  Login: "Login",
  TabBarBottomDisplay: "TabBarBottomDisplay",
  TabBarBottomSelectedLabel: "TabBarBottomSelectedLabel",
  navTopTitle: "navTopTitle",
  navTopBackDisplay: "navTopBackDisplay"
}

export default new Vuex.Store({
  state: {
    auth: {
      login: false //是否登录
    },
    tabBarBottom: { //底部导航
      tabs: [
        {
          path: '/',
          label: "首页",
          icon: "cubeic-home"
        },
        {
          path: '/list',
          label: "履职中心",
          icon: "cubeic-like"
        },
        {
          path: '/my',
          label: "个人中心",
          icon: "cubeic-person"
        }
      ],
      selectedLabel: '',
      isShow: true
    },
    navTop: { //顶部导航
      back: false,
      title: '',
      toolBarData: [],
      toolBarIsShow: false
    }
  },
  mutations: {
    [types.Login]: (state, data) => {
      //清除原token
      storage.setLocalStorage("token")
      //设置token
      storage.setLocalStorage("token", data.token)
      state.auth.login = data.token ? true : false

    },
    [types.TabBarBottomDisplay]: (state, bool) => {
      state.tabBarBottom.isShow = bool
    },
    [types.TabBarBottomSelectedLabel]: (state, name) => {
      state.tabBarBottom.selectedLabel = name;
    },
    [types.navTopTitle]: (state, title) => {
      state.navTop.title = title
    },
    [types.navTopBackDisplay]: (state, bool) => {
      state.navTop.back = bool
    },
  },
  actions: {
    [types.Login]: async ({ commit }, param) => {

      let res = await api.login(param);

      if (res && res.data) {
        commit(types.Login, res.data.data)
      }

      return res
    }
  }
})
