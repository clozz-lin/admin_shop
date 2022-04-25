import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './mock/mock'

import './assets/css/global.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = '/'
// axios.defaults.baseURL = 'http://localhost:8080/'
// axios.defaults.baseURL = 'http://127.0.0.1:4523/mock'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

axios.interceptors.response.use((config) => {
  NProgress.done()
  return config
})

Vue.use(ElementUI)

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
