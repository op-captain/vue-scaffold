import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'

Vue.use(Vuex)

const types = {
  TOKEN: "TOKEN"
}

export default new Vuex.Store({
  state: {
    [types.TOKEN]: ''
  },
  mutations: {
    [types.TOKEN]: (state, token) => {
      state[types.TOKEN] = token
    }
  },
  actions: {
    [types.TOKEN]:  async ({ commit }, param) => {

      let res = await api.login(param);

      console.log(res)

      commit(types.TOKEN, res.data.data.token)

    }
  }
})
