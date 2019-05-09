import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
import storage from '../utils/localStorage'

Vue.use(Vuex)

const types = {
  Login: "Login"
}

export default new Vuex.Store({
  state: {
    auth: {
      login: false //是否登录
    }
  },
  mutations: {
    [types.Login]: (state, data) => {
      //清除原token
      storage.setLocalStorage("token")
      //设置token
      storage.setLocalStorage("token",data.token)
      state.auth.login = data.token ? true : false

    }
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
