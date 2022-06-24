import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import request from "./utils/request"
import api from "./api"
import storage from './utils/storage'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'default-passive-events'

Vue.use(ElementUI, { size: "small" })

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$storage = storage

new Vue({
  render: h => h(App),
  router,
  store,
  counted () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
