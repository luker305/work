import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import VueCookie from "vue-cookie"

Vue.use(VueRouter)
Vue.use(VueCookie)

//获取用户登录类型，不同类型用户使用不同路由
const userType = Vue.cookie.get('userType')

const Login = () => import('../views/user/Login.vue')
// 住户管理
const HouseholderList = () => import('../views/user/householder/List.vue')
const HouseholderEdit = () => import('../views/user/householder/Edit.vue')
const HouseholderAdd = () => import('../views/user/householder/Add.vue')
const HouseholderRecycle = () => import('../views/user/householder/Recycle.vue')
const HouseholderPrInfo = () => import('../views/user/householder/PrInfo.vue')


// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]


let routes =[]
const defaultRoutes =[
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {title: '登录'}
  }
]
routes = [
  {
    path: '/householder/list',
    name: 'householderList',
    component: HouseholderList,
    meta: { title: '住户管理', isMainPage: true}
  },
  {
    path: '/householder/edit',
    name: 'householderEdit',
    component: HouseholderEdit,
    meta: { title: '住户管理', breadcrumbTitle: '编辑'}
  },
  {
    path: '/householder/add',
    name: 'householderAdd',
    component: HouseholderAdd,
    meta: { title: '住户管理', breadcrumbTitle: '新增'}
  },
  {
    path: '/householder/recycle',
    name: 'householderRecycle',
    component: HouseholderRecycle,
    meta: { title: '住户管理', breadcrumbTitle: '回收站'}
  },
  {
    path: '/householder/prInfo',
    name: 'householderPrInfo',
    component: HouseholderPrInfo,
    meta: { title: '住户管理', breadcrumbTitle: '个人信息'}
  }
]


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes:[...routes,...defaultRoutes]
})

export default router
