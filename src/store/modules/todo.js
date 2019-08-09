import { TodoModel } from '@/http/leancloud'

const state = {
  allTodos: []
}

const getters = {

}

const mutations = {
  setAllTodos(state, payload){
    state.allTodos = payload
  },
  setShowingTodos(state, payload){
    state.showingTodos = state.allTodos.filter(todo => {
      switch (payload) {
        case 'processing':
          return todo.status === 'processing'
        case 'completed':
          return todo.status === 'completed'
        case 'all':
          return true
      }
    })
  }
}

const actions = {
  async createTodo({commit},data) {
    let {content, status, deleted} = data
    let res = await TodoModel.create(content, status, deleted)
    return res
  },
  async getTodos({commit}) {
    TodoModel.getTodoByUser().then(res => {
        let allTodos = res.map(item => {
          return {id: item.id, createTime: item.createdAt, ...item.attributes}
        })
        commit('setAllTodos', allTodos)
      },
      error => {
        throw new Error(error)
      }
    )
  },
  async deleteTodoItem({commit}, todoItemId){
    let id = todoItemId
    return TodoModel.deleteTodoById(id)
  },
  async setTodoStatus({dispatch}, payload){
    TodoModel.setStatusById(payload).then( () =>{
      dispatch('getTodos')
    }, error => {
      console.log(error);
    })
  }
}

export default { state, getters, mutations, actions }
