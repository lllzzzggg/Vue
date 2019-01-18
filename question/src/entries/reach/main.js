import Vue from 'vue'
import router from '@/router/reach'
import store from '@/store/reach'
import flex from '@/utils/flex'
import App from './App.vue'

flex()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
