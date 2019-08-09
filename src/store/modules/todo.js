import { TodoModel } from '@/http/leancloud'

const state = {
  allTodos: []
}

const getters = {
  processingTodos(state) {
    let todos = state.allTodos.filter( todo => {
      todo.status === 'processing'
    })
    return todos
  },
  completedTodos(state) {
    let todos = state.allTodos.filter( todo => {
      todo.status === 'completed'
    })
    return todos
  }
}

const mutations = {
  setAllTodos(state, payload){
    state.allTodos = payload
  }
}

const actions = {
  async createTodo({commit}, data) {
    let {content, status, deleted} = data
    let res = await TodoModel.create(content, status, deleted)
    return res
  },
  async getTodos({commit}) {
    TodoModel.getTodoByUser().then(res => {
        console.log(res);
        let allTodos = res.map(item => {
          return {id: item.id, createTime: item.createdAt, ...item.attributes}
        })
        commit('setAllTodos', allTodos)
      },
      error => {
        throw new Error(error)
      }
    )
  }
}

export default { state, getters, mutations, actions }
