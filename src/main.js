import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'echarts'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
// import ECharts from 'vue-echarts'
// Vue.component('v-chart', ECharts)
Vue.use(VueDPlayer)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)

// axios.defaults.baseURL = '/api'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common.token = store.state.token
    }
    return config
  },
  error => {
    // 对请求错误做什么
    return Promise.reject(error)
  })

// http reponse响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }// 登录成功后跳入浏览的当前页面
          })
          break
        default:
          console.log(error)
          // localStorage.removeItem('token')
          // localStorage.removeItem('user')
          // router.replace({
          //   path: '/login',
          //   query: { redirect: router.currentRoute.fullPath }// 登录成功后跳入浏览的当前页面
          // })
      }
    }
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
