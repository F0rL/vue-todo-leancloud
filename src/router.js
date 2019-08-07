import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {getCurrentUer} from './http/leancloud'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: { requireLogin: true}
    }
  ]
})

//导航守卫，先判断路由meta字段，再判断登陆状态
router.beforeEach((to, from, next) => {
  const currentUser = getCurrentUer()
  console.log(currentUser)
  if(currentUser) {
    store.commit('setUser', currentUser)
    store.commit('setLogin', true)
  }
  if (to.matched.some(record => record.meta.requireLogin)) {
    if(store.state.auth.isLogin) {
      next()
    } else {
      next('/')
    }
  } else {
    if(store.state.auth.isLogin) {
      next('/user')
    } else {
      next()
    }
  }
})

export default router
