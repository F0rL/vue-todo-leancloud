// import Leancloud from '@/http/leancloud.js'
// const Todo = new Leancloud('Todo')
import {getCurrentUer} from '@/http/leancloud'
const state = {
  user: null,
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
    commit('setUser', userInfo)
  }
}

export default {state, getters, mutations, actions}
