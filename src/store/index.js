import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // token
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  },
  mutations: {
    $_setToken (state, value) { // 设置存储token
      state.token = value
      localStorage.setItem('token', value)
    },
    $_removeStorage (state, value) { // 删除token
      localStorage.removeItem('token')
    },
    $_setUser (state, user) { // 设置存储user
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    $_removeUser (state) { // 删除user
      localStorage.removeItem('user')
    },
    $_setRole (state, role) { // 设置存储role
      state.role = role
      localStorage.setItem('role', JSON.stringify(role))
    },
    $_removeRole (state) { // 删除user
      localStorage.removeItem('role')
    }
  },
  actions: {
  },
  modules: {
  },
  getters: { // 监听数据变化的
    getStorage (state) { // 获取本地存储的登录信息
      if (!state.token) {
        state.token = JSON.parse(localStorage.getItem('token'))
      }
      return state.token
    }
  }
})
