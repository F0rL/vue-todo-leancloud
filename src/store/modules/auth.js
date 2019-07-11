// import Leancloud from '@/http/leancloud.js'
// const Todo = new Leancloud('Todo')

const state = {
  user: null,
  isLogin: false
}

const getters = {}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setLogin(state, payload) {
    state.isLogin = payload
  }
}

const actions = {}

export default {state, getters, mutations, actions}
