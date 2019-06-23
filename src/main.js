import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'

import go from '../node_modules/gojs/release/go'
Vue.prototype.go = go


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
