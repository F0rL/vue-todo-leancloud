import {getCurrentUer} from '@/http/leancloud'
const state = {
  user: {},
  isLogin: false
}

const getters = {

}

const mutations = {
  setUser(state, payload) {
    state.user= payload
  },
  setLogin(state, payload) {
    state.isLogin = payload
  }
}

const actions = {
  async getUserInfo({commit}) {
    let userInfo = getCurrentUer()
    if(userInfo) {
      commit('setLogin', true)
    }
    commit('setUser', userInfo)
  }
}

export default {state, getters, mutations, actions}
