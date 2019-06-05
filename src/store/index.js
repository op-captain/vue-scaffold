import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
import storage from '../utils/localStorage'
import * as mutationType from './mutation-types'

Vue.use(Vuex)

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
    [mutationType.LOGIN]: (state, data) => {
      //清除原token
      storage.setLocalStorage("token")
      //设置token
      storage.setLocalStorage("token", data.token)
      state.auth.login = data.token ? true : false

    },
    [mutationType.TAB_BAR_BOTTOM_DISPLAY]: (state, bool) => {
      state.tabBarBottom.isShow = bool
    },
    [mutationType.TAB_BAR_BOTTOM_SELECTED_LABEL]: (state, name) => {
      state.tabBarBottom.selectedLabel = name;
    },
    [mutationType.NAV_TOP_TITLE]: (state, title) => {
      state.navTop.title = title
    },
    [mutationType.NAV_TOP_BACK_DISPLAY]: (state, bool) => {
      state.navTop.back = bool
    },
  },
  actions: {
    [mutationType.LOGIN]: async ({ commit }, param) => {

      let res = await api.login(param);

      if (res && res.data) {
        commit(mutationType.LOGIN, res.data.data)
      }

      return res
    }
  }
})
