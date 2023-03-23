import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, //账号信息
    appPageToolsMap: {}, //所有缓存页面工具按钮
  },
  getters: {
  },
  mutations: {
    setUser(state, val) {
      state.user = val
    },
    setAppPageToolsMap(state, obj) {
      // 使用Vue.set(object, key, value)方法
      Vue.set(state.appPageToolsMap, obj.key, obj.value)
    }
  },
  actions: {
  },
  modules: {
  }
})
