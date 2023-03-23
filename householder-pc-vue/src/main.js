import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie';
import api from './api/api'

import ElementUI from 'element-ui'  //element-ui引入
// import 'element-ui/lib/theme-chalk/index.css'  //element-ui默认css样式
import './styles/element-variables.scss'  //改用element-variables.scss样式
import './styles/common.scss' //引入自己设置的额外scss设置
import './directive' //引入自定义指令
import vuescroll from 'vuescroll/dist/vuescroll-native'//滚动样式
import { Constants } from './utils/constants'//引入工具常量
import filters from './utils/filters'//引入全局过滤器


Vue.use(ElementUI)  //element-ui使用
Vue.use(VueCookie);
Vue.prototype.$api = api //挂载到vue原形上
Vue.prototype.$Constants = Constants  //挂载到vue原型上
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#ccc',
      onlyShowBarOnScroll: false,
    }
  }
})

// 定义全局过滤器
// Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组
Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn)
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
