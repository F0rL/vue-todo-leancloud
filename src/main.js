import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//不使用VueX和后端
//import Leancloud from './http/leancloud-lower'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
